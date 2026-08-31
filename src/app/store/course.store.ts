// import { Service, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { environment } from '../../environments/environment';
// import { Course, PagedResponse } from '../models/course.model';

// @Service()
// export class CourseService {
//   private http = inject(HttpClient);

//   private readonly base = `${environment.apiUrl}/courses`;

//   // Get all courses
//   getAll() {
//     return this.http
//       .get<PagedResponse<Course>>(this.base, {
//         params: {
//           page: '1',
//           pageSize: '50',
//         },
//       })
//       .pipe(
//         map((response) => response.items)
//       );
//   }

//   // Delete a course
//   delete(id: number) {
//     return this.http.delete<void>(
//       `${this.base}/${id}`
//     );
//   }
// }

/// #########################################################################################################################
// ##########################################################################################################################

// import { computed, inject } from '@angular/core';
// import { signalStore, withComputed, withMethods, patchState, withState } from '@ngrx/signals';

// import { withEntities, setAllEntities, removeEntity } from '@ngrx/signals/entities';

// import { rxMethod } from '@ngrx/signals/rxjs-interop';

// import { pipe, concatMap, tap, catchError, EMPTY } from 'rxjs';

// import { CourseService } from '../services/course.service';
// import { Course } from '../models/course.model';

// export const CourseStore = signalStore(
//   { providedIn: 'root' },

//   withState({
//     isLoading: false,
//     error: null as string | null,
//   }),

//   withEntities<Course>(),

//   withMethods((store, svc = inject(CourseService)) => ({
//     deleteCourse(id: number) {
//       // 1. IMPORTANT:
//       // Capture the snapshot BEFORE modifying the store.
//       const previousSnapshot = store.entities();

//       // 2. Remove immediately from the UI.
//       patchState(store, removeEntity(id));

//       // 3. Call the backend.
//       svc
//         .delete(id)
//         .pipe(
//           catchError(() => {
//             // 4. Backend rejected deletion.
//             // Restore the original entities.
//             patchState(store, setAllEntities(previousSnapshot));

//             patchState(store, {
//               error: 'Cannot delete course: active student enrollments exist.',
//             });

//             return EMPTY;
//           }),
//         )
//         .subscribe();
//     },
//   })),
// );

import { inject } from '@angular/core';
import { signalStore, withMethods, patchState, withState } from '@ngrx/signals';

import { withEntities, setAllEntities, removeEntity } from '@ngrx/signals/entities';

import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { pipe, concatMap, tap, catchError, EMPTY } from 'rxjs';

import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';

export const CourseStore = signalStore(
  { providedIn: 'root' },

  withState({
    isLoading: false,
    error: null as string | null,
  }),

  withEntities<Course>(),

  withMethods((store, svc = inject(CourseService)) => ({
    loadCourses: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, {
            isLoading: true,
            error: null,
          });
        }),

        concatMap(() =>
          svc.getAll().pipe(
            tap((courses) => {
              console.log('Courses from API:', courses);

              patchState(store, setAllEntities(courses), {
                isLoading: false,
              });
            }),

            catchError((err) => {
              console.error('Failed to load courses:', err);

              patchState(store, {
                isLoading: false,
                error: err.error?.detail ?? 'Failed to load courses.',
              });

              return EMPTY;
            }),
          ),
        ),
      ),
    ),

    deleteCourse(id: number) {
      // 1. Capture snapshot BEFORE changing the store.
      const previousSnapshot = store.entities();

      console.log('Deleting course:', id);

      // 2. Optimistically remove the course immediately.
      patchState(store, removeEntity(id));

      console.log('Course removed optimistically:', store.entities());

      // 3. Send DELETE request to the API.
      svc
        .delete(id)
        .pipe(
          catchError((err) => {
            console.error('Course deletion failed:', err);

            // 4. Roll back to the previous snapshot.
            patchState(store, setAllEntities(previousSnapshot));

            patchState(store, {
              error: err.error?.detail ?? 'Cannot delete course: active student enrollments exist.',
            });

            return EMPTY;
          }),
        )
        .subscribe(() => {
          console.log('Course deleted successfully.');
        });
    },
  })),
);
