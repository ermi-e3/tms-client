import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GradePayload {
  studentId: number;
  courseId: number;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  private http = inject(HttpClient);

  postGrade(payload: GradePayload): Observable<{ id: string; success: boolean }> {
    return this.http.post<{ id: string; success: boolean }>('/api/grades', payload);
  }
}

// import { inject, Service } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs'

// export interface GradePayload {
//   studentId: number;
//   courseId: number;
//   score: number;
// }
// @Service()
// export class GradeService {
//   private http = inject(HttpClient);
//   postGrade(payload: GradePayload): Observable<{ id: string; success: boolean }> {
//     return this.http.post<{ id: string; success: boolean }>('/api/grades', payload);
//   }
// }

// /////////////////////////////////////////////////////////////////////////
// Exercise 4: The Rage-Click Defender (exhaustMap)
// The Three Flattening Operators- When Each One Matters
// Before writing code, understand the three RxJS operators that handle “a new
// event arrives while a previous HTTP request is still in flight”:

// For Dawit’s grade submission, the correct choice is exhaustMap. While the first
// POST is in flight, any subsequent clicks are silently dropped. The first request
// completes, the grade is saved once, and Dawit moves to the next student.
// Using switchMap here would be dangerous: it cancels the in-flight request on the
// client, but the server may have already processed and committed the grade
// before the cancellation frame arrives leading to a saved grade with no client
// confirmation.

// # Step 1: Generate the Component and Service
// Generate the grade submission feature component and its supporting HTTP
// service:
// ng generate service services/grade--type=service
// ng generate component features/grade-submission--type=component
// # Step 2: Implement the Grade Service
// Open src/app/services/grade.service.ts and implement the HTTP client
// interface using Angular 22’s @Service() decorator:

// import { Service } from '@angular/core';

// export interface GradePayload {
//   studentId: number;
//   courseId: number;
//   score: number;
// }
// @Service()
// export class GradeService {
//   private http = inject(HttpClient);
//   postGrade(payload: GradePayload): Observable<{ id: string; success: boolean }> {
//     return this.http.post<{ id: string; success: boolean }>('/api/grades', payload);
//   }
// }

// Step 3: Implement the Guarded Component Class (Reactive Form)
// Open src/app/features/grade-submission/grade-submission.component.ts.
// Import ReactiveFormsModule, FormBuilder, and Validators alongside Angular
// Material components. Construct an explicit gradeForm group and set up the
// Subject-based event stream protected by exhaustMap:

// @Component({
//   selector: 'tms-grade-submission',
//   standalone: true,
//   imports: [
//     // Do import the necessary modules and components
//   ],
//   templateUrl: './grade-submission.component.html',
// })
// export class GradeSubmissionComponent {
//   private api = inject(GradeService);
//   private fb = inject(FormBuilder);
//   // Reactive Form definition with initial model values and validators
//   gradeForm = this.fb.group({
//     studentId: [101, [Validators.required, Validators.min(1)]],
//     courseId: [302, [Validators.required, Validators.min(1)]],
//     score: [88, [Validators.required, Validators.min(0), Validators.max(100)]],
//   });
//   isSubmitting = false;
//   submissionStatus = '';
//   // A Subject is a manual event stream — template clicks push payloadsinto it
//   private submitClick$ = new Subject<GradePayload>();
//   constructor() {
//     this.submitClick$
//       .pipe(
//         // exhaustMap: while the inner HTTP observable is active,
//         // ALL new emissions from submitClick$ are silently dropped.
//         // Dawit can click 50 times — only ONE POST request fires.
//         exhaustMap((payload) => {
//           this.isSubmitting = true;
//           this.submissionStatus = 'Submitting grade to server...';
//           return this.api.postGrade(payload);
//         }),
//         // takeUntilDestroyed: automatically unsubscribes when Angular
//         // destroys this component, preventing memory leaks.
//         // Placed inside constructor to inherit the active injection context.
//         takeUntilDestroyed(),
//       )
//       .subscribe({
//         next: (result) => {
//           this.isSubmitting = false;
//           this.submissionStatus = `Grade saved successfully! Record ID: ${result.id}`;
//         },
//         error: (err) => {
//           this.isSubmitting = false;
//           this.submissionStatus = `Submission failed: ${err.message || 'Server error'}`;
//         },
//       });
//   }

//   // The template form submit handler pushes valid values into the
//   protected stream;
//   onSubmit() {
//     if (this.gradeForm.valid) {
//       const rawValue = this.gradeForm.getRawValue();
//       this.submitClick$.next({
//         studentId: Number(rawValue.studentId),
//         courseId: Number(rawValue.courseId),
//         score: Number(rawValue.score),
//       });
//     }
//   }
// }

// // Step 4: Build the Grade Submission Template (Reactive Form + Material + Tailwind)
// // Open src/app/features/grade-submission/grade-submission.component.html
// // and bind the [formGroup]="gradeForm" with formControlName bindings,
// // validation error messages (<mat-error>), and button disability states:

// <div class="max-w-md mx-auto my-8">
// <mat-card class="shadow-xl rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 p-6">
// <mat-card-header class="mb-4">
// <mat-card-title class="text-xl font-bold text-slate-100">Grade Su
// bmission Form</mat-card-title>
// <mat-card-subtitle class="text-slate-400 text-sm">Instructor Midt
// erm Grading</mat-card-subtitle>
// </mat-card-header>

// <form [formGroup]="gradeForm" (ngSubmit)="onSubmit()">
// <mat-card-content class="space-y-4">
// <mat-form-field appearance="outline" class="w-full">
// <mat-label>Student ID</mat-label>
// <input matInput type="number" formControlName="studentId" />
// @if (gradeForm.controls.studentId.hasError('required')) {
// <mat-error>Student ID is required</mat-error>
// }
// </mat-form-field>

// <mat-form-field appearance="outline" class="w-full">
// <mat-label>Course ID</mat-label>
// <input matInput type="number" formControlName="courseId" />
// @if (gradeForm.controls.courseId.hasError('required')) {
// <mat-error>Course ID is required</mat-error>
// }
// </mat-form-field>

// <mat-form-field appearance="outline" class="w-full">
// <mat-label>Score (0-100)</mat-label>
// <input matInput type="number" formControlName="score" />
// @if (gradeForm.controls.score.hasError('min') || gradeForm.co
// ntrols.score.hasError('max')) {
// <mat-error>Score must be between 0 and 100</mat-error>
// }
// </mat-form-field>

// @if (isSubmitting) {
// <div class="flex justify-center py-3">
// <mat-spinner diameter="32"></mat-spinner>
// </div>
// }
// @if (submissionStatus) {
// <div class="mt-4 p-3 rounded-lg bg-slate-800 text-sky-400 tex
// t-sm font-medium border border-slate-700">
// {{ submissionStatus }}
// </div>
// }
// </mat-card-content>

// <mat-card-actions class="mt-4">
// <button mat-raised-button color="primary" type="submit" [disabled]="gradeForm.invalid || isSubmitting" class="w-full py-3 text-base font-semibold">Submit Final Grade </button>
// </mat-card-actions>
// </form>
// </mat-card>
// </div>

// Step 5: Add Route Registration
// Open src/app/app.routes.ts and add the lazy-loaded route:
// {
//     path: 'grade-submission',
// loadComponent: () =>
// import('./features/grade-submission/grade-submission.component')
// .then(m => m.GradeSubmissionComponent)
// }
