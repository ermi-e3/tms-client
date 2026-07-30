import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/student-dashboard/student-dashboard.component').then(
        (m) => m.StudentDashboardComponent,
      ),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./features/course-detail/course-detail').then((m) => m.CourseDetail),
  },

  {
    path: 'enroll',
    loadComponent: () =>
      import('./features/enrollment-form/enrollment-form').then((m) => m.EnrollmentForm),
  },

  {
    path: 'enrollments',
    loadComponent: () =>
      import('./features/enrollment-list/enrollment-list.component').then(
        (m) => m.EnrollmentListComponent,
      ),
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
