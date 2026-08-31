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

import { computed, inject } from '@angular/core';
import { signalStore, withComputed, withMethods, patchState, withState } from '@ngrx/signals';

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
    deleteCourse(id: number) {
      // 1. IMPORTANT:
      // Capture the snapshot BEFORE modifying the store.
      const previousSnapshot = store.entities();

      // 2. Remove immediately from the UI.
      patchState(store, removeEntity(id));

      // 3. Call the backend.
      svc
        .delete(id)
        .pipe(
          catchError(() => {
            // 4. Backend rejected deletion.
            // Restore the original entities.
            patchState(store, setAllEntities(previousSnapshot));

            patchState(store, {
              error: 'Cannot delete course: active student enrollments exist.',
            });

            return EMPTY;
          }),
        )
        .subscribe();
    },
  })),
);
