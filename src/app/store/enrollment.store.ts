// import { computed, inject } from '@angular/core';
// import { signalStore, withComputed, withMethods, patchState, withState } from '@ngrx/signals';
// import { withEntities, setAllEntities, updateEntity } from '@ngrx/signals/entities';
// import { rxMethod } from '@ngrx/signals/rxjs-interop';
// import { pipe, concatMap, tap, catchError, EMPTY } from 'rxjs';
// import { EnrollmentService } from '../services/enrollment';
// import { Enrollment } from '../models/enrollment.model';

// export const EnrollmentStore = signalStore(
//   { providedIn: 'root' },
//   withState({ isLoading: false, error: null as string | null }),
//   withEntities<Enrollment>(),
//   withComputed((store) => ({
//     pendingCount: computed(() => store.entities().filter((e) => e.status === 'Pending').length),
//   })),
//   withMethods((store, api = inject(EnrollmentService)) => ({
//     // loadEnrollments: rxMethod<void>(
//     //   pipe(
//     //     tap(() => {
//     //       console.log('loadEnrollments called');
//     //       patchState(store, { isLoading: true, error: null });
//     //     }),
//     //     concatMap(() =>
//     //       api.getAll().pipe(
//     //         tap((rows) => patchState(store, setAllEntities(rows), { isLoading: false })),
//     //         catchError((err) => {
//     //           patchState(store, { isLoading: false, error: err.message });
//     //           return EMPTY; // EMPTY completes silently so the rxMethod pipeline survives
//     //         }),
//     //       ),
//     //     ),
//     //   ),
//     // ),

//     loadEnrollments: rxMethod<void>(
//       pipe(
//         tap(() => {
//           console.log('loadEnrollments called');
//           patchState(store, { isLoading: true, error: null });
//         }),
//         concatMap(() =>
//           api.getAll().pipe(
//             tap((rows) => {
//               console.log('Rows from API:', rows);
//               patchState(store, setAllEntities(rows), {
//                 isLoading: false,
//               });
//             }),
//             catchError((err) => {
//               console.error('API ERROR:', err);
//               patchState(store, {
//                 isLoading: false,
//                 error: err.message,
//               });
//               return EMPTY;
//             }),
//           ),
//         ),
//       ),
//     ),

//     approveEnrollment: rxMethod<number>(
//       pipe(
//         tap((id) => {
//           patchState(store, updateEntity({ id, changes: { status: 'Approved' } }));
//         }),
//         concatMap((id) =>
//           api.approve(id).pipe(
//             catchError((err) => {
//               patchState(store, updateEntity({ id, changes: { status: 'Pending' } }));
//               patchState(store, {
//                 error: 'Server rejected the approval.Check enrollment constraints.',
//               });
//               return EMPTY;
//             }),
//           ),
//         ),
//       ),
//     ),

//     rejectEnrollment: rxMethod<number>(
//       pipe(
//         tap((id) => {
//           // Optimistically update the UI
//           patchState(
//             store,
//             updateEntity({
//               id,
//               changes: { status: 'Rejected' },
//             }),
//           );
//         }),
//         concatMap((id) =>
//           api.reject(id).pipe(
//             catchError(() => {
//               // Roll back if the request fails
//               patchState(
//                 store,
//                 updateEntity({
//                   id,
//                   changes: { status: 'Pending' },
//                 }),
//               );

//               patchState(store, {
//                 error: 'Server rejected the operation.',
//               });

//               return EMPTY;
//             }),
//           ),
//         ),
//       ),
//     ),
//   })),
// );

// // // Open src/app/store/enrollment.store.ts. Update the imports and add
// // // listenForLiveUpdates inside withMethods:
// // export const EnrollmentStore = signalStore(
// //   { providedIn: 'root' },
// //   withEntities<Enrollment>(),
// //   withMethods((store, api = inject(EnrollmentService), sync = inject(LiveSync)) => ({
// //     // Listens to SignalR live sync stream and updates store state automatically
// //     listenForLiveUpdates: rxMethod<void>(
// //       pipe(
// //         tap(() => sync.connect()),
// //         switchMap(() => sync.events$),
// //         tap((event) => {
// //           patchState(store, updateEntity({ id: event.id, changes: { status: event.status } }));
// //         }),
// //       ),
// //     ),
// //     // ... your existing loadEnrollments() and approveEnrollment() methods
// //   })),
// // );

import { computed, inject } from '@angular/core';

import { signalStore, withComputed, withMethods, patchState, withState } from '@ngrx/signals';

import { withEntities, setAllEntities, updateEntity } from '@ngrx/signals/entities';

import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { pipe, concatMap, switchMap, tap, catchError, EMPTY } from 'rxjs';

import { EnrollmentService } from '../services/enrollment';
import { Enrollment } from '../models/enrollment.model';
import { LiveSync } from '../services/live-sync';

export const EnrollmentStore = signalStore(
  { providedIn: 'root' },

  // ---------------------------------------------------------
  // State
  // ---------------------------------------------------------
  withState({
    isLoading: false,
    error: null as string | null,
  }),

  // ---------------------------------------------------------
  // Enrollment entities
  // ---------------------------------------------------------
  withEntities<Enrollment>(),

  // ---------------------------------------------------------
  // Computed values
  // ---------------------------------------------------------
  withComputed((store) => ({
    pendingCount: computed(() => store.entities().filter((e) => e.status === 'Pending').length),
  })),

  // ---------------------------------------------------------
  // Methods
  // ---------------------------------------------------------
  withMethods((store, api = inject(EnrollmentService), sync = inject(LiveSync)) => ({
    // =====================================================
    // SignalR live updates
    // =====================================================
    listenForLiveUpdates: rxMethod<void>(
      pipe(
        // Start SignalR connection
        tap(() => {
          console.log('Starting SignalR live sync...');
          sync.connect();
        }),

        // Listen continuously for server events
        switchMap(() => sync.events$),

        // Update the matching enrollment
        tap((event) => {
          console.log('Live enrollment update:', event);

          const enrollmentId = Number(event.id);

          if (Number.isNaN(enrollmentId)) {
            console.error('Invalid enrollment ID from SignalR:', event.id);

            return;
          }

          patchState(
            store,
            updateEntity({
              id: enrollmentId,
              changes: {
                status: event.status,
              },
            }),
          );
        }),
      ),
    ),

    // =====================================================
    // Load enrollments
    // =====================================================
    loadEnrollments: rxMethod<void>(
      pipe(
        tap(() => {
          console.log('loadEnrollments called');

          patchState(store, {
            isLoading: true,
            error: null,
          });
        }),

        concatMap(() =>
          api.getAll().pipe(
            tap((rows) => {
              console.log('Rows from API:', rows);

              patchState(store, setAllEntities(rows), {
                isLoading: false,
              });
            }),

            catchError((err) => {
              console.error('API ERROR:', err);

              patchState(store, {
                isLoading: false,
                error: err?.message ?? 'Failed to load enrollments.',
              });

              return EMPTY;
            }),
          ),
        ),
      ),
    ),

    // =====================================================
    // Approve enrollment
    // =====================================================
    approveEnrollment: rxMethod<number>(
      pipe(
        tap((id) => {
          // Optimistic UI update
          patchState(
            store,
            updateEntity({
              id,
              changes: {
                status: 'Approved',
              },
            }),
          );
        }),

        concatMap((id) =>
          api.approve(id).pipe(
            catchError((err) => {
              // Roll back optimistic update
              patchState(
                store,
                updateEntity({
                  id,
                  changes: {
                    status: 'Pending',
                  },
                }),
              );

              patchState(store, {
                error: 'Server rejected the approval. Check enrollment constraints.',
              });

              return EMPTY;
            }),
          ),
        ),
      ),
    ),

    // =====================================================
    // Reject enrollment
    // =====================================================
    rejectEnrollment: rxMethod<number>(
      pipe(
        tap((id) => {
          // Optimistic UI update
          patchState(
            store,
            updateEntity({
              id,
              changes: {
                status: 'Rejected',
              },
            }),
          );
        }),

        concatMap((id) =>
          api.reject(id).pipe(
            catchError(() => {
              // Roll back if request fails
              patchState(
                store,
                updateEntity({
                  id,
                  changes: {
                    status: 'Pending',
                  },
                }),
              );

              patchState(store, {
                error: 'Server rejected the operation.',
              });

              return EMPTY;
            }),
          ),
        ),
      ),
    ),
  })),
);
