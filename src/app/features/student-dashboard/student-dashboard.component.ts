// These are the Angular functions we need. signal() and computed() come from Angular's core.
import { Component, signal, computed, inject } from '@angular/core';
import { DashboardSummary } from '../dashboard-summary/dashboard-summary.component';
import { EnrollmentListComponent } from '../enrollment-list/enrollment-list.component';
import { CourseCard } from '../../ui/course-card/course-card';
import { Course } from '../../models/course.model';
import { rxResource } from '@angular/core/rxjs-interop';
import { CourseService } from '../../services/course.service';
import { RouterLink } from '@angular/router';

// The @Component decorator tells Angular: "This class is a visual component."
// It is metadata it describes how this class connects to the HTML template.
// @Component({
//   selector: 'app-student-dashboard', // The HTML tag name: <app-student-dashboard />
//   standalone: true, // This component manages its own imports (no NgModule)
//   templateUrl: './student-dashboard.component.html', // Points to the HTML file
//   styleUrl: './student-dashboard.component.scss', // Points to the styles file
// })

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CourseCard, RouterLink, DashboardSummary, EnrollmentListComponent], // This tells Angular: "I use Course CardComponent in my template"
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent {
  // signal('Liya Kebede') creates a reactive variable. Angular watchesit.
  // When its value changes, Angular automatically updates the part of the screen that displays it.
  // studentName = signal('Liya Kebede');
  // earnedCredits = signal(45);
  // // computed() creates a read-only signal that derives its value from other signals.
  // // It recalculates automatically whenever earnedCredits() changes no manual refresh.
  // graduationStatus = computed(() =>
  //   this.earnedCredits() >= 120 ? 'Eligible for Graduation' : 'In Progress',
  // );
  // // A regular method. When called, it updates the earnedCredits signal.
  // // The .update() method receives the current value (c) and returns the new value (c + 3).
  // registerForClass() {
  //   this.earnedCredits.update((c) => c + 3);
  // }

  selectedCourse = signal<Course | null>(null);

  // A sample course to display (we will switch to an array later)
  sampleCourse: Course = {
    id: 1,
    title: 'Advanced Java Services',
    code: 'CSE-101',
    maxCapacity: 30,
    enrollmentCount: 12,
  };

  // inject(CourseService) requests the service we just created.
  // Angular finds the singleton instance and gives it to us.
  private api = inject(CourseService);
  studentName = signal('Liya Kebede');
  earnedCredits = signal(45);
  graduationStatus = computed(() =>
    this.earnedCredits() >= 120 ? 'Eligible for Graduation' : 'In Progress',
  );
  // rxResource wraps the HTTP call into three managed signals:
  //- coursesResource.isLoading() → true while waiting for the server response
  //- coursesResource.error() → the error object if the request fails
  //- coursesResource.value() → the Course[] array when the request succeeds
  //
  // It handles subscribing (starting the request) and unsubscribing (cleaning up
  // if the user navigates away before the response arrives) automatically.
  // You never write .subscribe() or .unsubscribe() with rxResource.
  coursesResource = rxResource({
    stream: () => this.api.getAll(),
  });

  handleEnroll(course: Course) {
    this.selectedCourse.set(course);
    console.log('Enrollment requested for:', course.title);
  }
}
