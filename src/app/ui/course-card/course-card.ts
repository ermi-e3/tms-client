import { Component, input, output } from '@angular/core';
import { Course } from '../../models/course.model';
import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-course-card',
//   imports: [],
//   templateUrl: './course-card.html',
//   styleUrl: './course-card.scss',
// })
// export class CourseCard {}

@Component({
  selector: 'tms-course-card',
  standalone: true,
  // imports: [],
  imports: [RouterLink],
  templateUrl: './course-card.html',
  styleUrl: './course-card.scss',
})
export class CourseCard {
  course = input.required<Course>();
  enrollClicked = output<Course>();
}

// // Nowadd asample course and a handler to the class body:
// // signal<Course | null>(null) means: "This signal holds either a Course or nothing."
// // The | null syntax is TypeScript's way of saying a value can be absent.
// selectedCourse = signal<Course | null>(null);
// // A sample course to display (we will switch to an array in Excercise3)
// sampleCourse: Course = {
// id: 1,
// title: "Advanced Java Services",
// code: "CSE-101",
// maxCapacity: 30,
// enrollmentCount: 12,
// };
// handleEnroll(course: Course) {
// this.selectedCourse.set(course);
// console.log('Enrollment requested for:', course.title);
// }
