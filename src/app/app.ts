import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Course } from './models/course.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  // templateUrl: './app.html',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('tms-client');
}

// export class App {
//   selectedCourse = signal<Course | null>(null);

//   // A sample course to display (we will switch to an array later)
//   sampleCourse: Course = {
//     id: 1,
//     title: 'Advanced Java Services',
//     code: 'CSE-101',
//     maxCapacity: 30,
//     enrollmentCount: 12,
//   };

//   handleEnroll(course: Course) {
//     this.selectedCourse.set(course);
//     console.log('Enrollment requested for:', course.title);
//   }
// }
