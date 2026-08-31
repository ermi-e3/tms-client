
// import { Component, inject, OnInit, signal } from '@angular/core';
// import { CourseService } from '../../services/course.service';
// import { Course } from '../../models/course.model';

// @Component({
//   selector: 'tms-course-catalog',
//   standalone: true,
//   templateUrl: './course-catalog.component.html',
//   styleUrl: './course-catalog.component.scss',
// })
// export class CourseCatalogComponent implements OnInit {
//   private readonly courseService = inject(CourseService);

//   readonly courses = signal<Course[]>([]);
//   readonly isLoading = signal(false);
//   readonly error = signal<string | null>(null);

//   ngOnInit(): void {
//     this.loadCourses();
//   }

//   loadCourses(): void {
//     this.isLoading.set(true);
//     this.error.set(null);

//     console.log('Loading courses...');

//     this.courseService.getAll().subscribe({
//       next: (courses) => {
//         console.log('Courses from API:', courses);

//         this.courses.set(courses);
//         this.isLoading.set(false);
//       },

//       error: (err) => {
//         console.error('Failed to load courses:', err);

//         this.error.set(
//           err.error?.detail ?? 'Failed to load courses.',
//         );

//         this.isLoading.set(false);
//       },
//     });
//   }

//   deleteCourse(id: number): void {
//     console.log('Delete course:', id);
//   }
// }


import { Component, inject, OnInit } from '@angular/core';
import { CourseStore } from '../../store/course.store';

@Component({
  selector: 'tms-course-catalog',
  standalone: true,
  templateUrl: './course-catalog.component.html',
  styleUrl: './course-catalog.component.scss',
})
export class CourseCatalogComponent implements OnInit {
  readonly store = inject(CourseStore);

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    // Load courses from the API.
    // We use the store as the single source of truth.
    this.store.loadCourses();
  }

  onDelete(id: number): void {
    this.store.deleteCourse(id);
  }
}

