import { Routes } from '@angular/router';
import { roleGuard } from './guards/role.guard';
import { CourseCatalogComponent } from './features/course-catalog/course-catalog.component';
import { UnauthorizedComponent } from './features/unauthorized/unauthorized.component';
import { AdminCourseListComponent } from './features/admin-course-list/admin-course-list.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/instructor-dashboard/instructor-dashboard.component').then(
        (m) => m.InstructorDashboardComponent,
      ),
  },
  {
    path: 'enrollments',
    loadComponent: () =>
      import('./features/enrollment-list/enrollment-list.component').then(
        (m) => m.EnrollmentListComponent,
      ),
  },

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
    path: 'grade-submission',
    loadComponent: () =>
      import('./features/grade-submission/grade-submission.component').then(
        (m) => m.GradeSubmissionComponent,
      ),
  },

  {
  path: 'catalog',
  loadComponent: () =>
    import('./features/course-catalog/course-catalog.component').then(
      (m) => m.CourseCatalogComponent,
    ),
},
{
path: 'admin/courses',
component: AdminCourseListComponent,
canActivate: [roleGuard('Admin')],
},

{
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
