// import { Component, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// import { Subject, exhaustMap } from 'rxjs';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';

// import { GradeService, GradePayload } from '../../services/grade.service';

// @Component({
//   selector: 'tms-grade-submission',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatCardModule,
//   ],
//   templateUrl: './grade-submission.component.html',
// })
// export class GradeSubmissionComponent {
//   private api = inject(GradeService);
//   private fb = inject(FormBuilder);

//   gradeForm = this.fb.group({
//     studentId: [101, [Validators.required, Validators.min(1)]],

//     assessmentId: [302, [Validators.required, Validators.min(1)]],

//     score: [88, [Validators.required, Validators.min(0), Validators.max(100)]],
//   });

//   isSubmitting = false;
//   submissionStatus = '';

//   private submitClick$ = new Subject<GradePayload>();

//   constructor() {
//     this.submitClick$
//       .pipe(
//         exhaustMap((payload) => {
//           this.isSubmitting = true;
//           this.submissionStatus = 'Submitting grade to server...';

//           return this.api.postGrade(payload);
//         }),

//         takeUntilDestroyed(),
//       )
//       .subscribe({
//         next: (result) => {
//           this.isSubmitting = false;

//           this.submissionStatus = `Grade saved successfully! Record ID: ${result.id}`;
//         },

//         error: (err) => {
//           this.isSubmitting = false;

//           this.submissionStatus = `Submission failed: ${err?.message || 'Server error'}`;
//         },
//       });
//   }

//   onSubmit(): void {
//     if (this.gradeForm.invalid) {
//       this.gradeForm.markAllAsTouched();
//       return;
//     }

//     const rawValue = this.gradeForm.getRawValue();

//     this.submitClick$.next({
//       studentId: Number(rawValue.studentId),
//       assessmentId: Number(rawValue.assessmentId),
//       score: Number(rawValue.score),
//     });
//   }
// }

import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subject, exhaustMap, catchError, finalize, EMPTY } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { GradeService, GradePayload } from '../../services/grade.service';

@Component({
  selector: 'tms-grade-submission',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './grade-submission.component.html',
})
export class GradeSubmissionComponent {
  private api = inject(GradeService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  gradeForm = this.fb.group({
    studentId: [4, [Validators.required, Validators.min(1)]],

    assessmentId: [8, [Validators.required, Validators.min(1)]],

    score: [48, [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  isSubmitting = false;
  submissionStatus = '';

  private submitClick$ = new Subject<GradePayload>();

  constructor() {
    this.submitClick$
      .pipe(
        exhaustMap((payload) => {
          this.isSubmitting = true;
          this.submissionStatus = 'Submitting grade to server...';

          return this.api.postGrade(payload).pipe(
            catchError((err) => {
              console.error('Grade submission error:', err);

              this.submissionStatus = `Submission failed: ${
                err?.error?.message ?? err?.message ?? 'Server error'
              }`;

              return EMPTY;
            }),

            // finalize(() => {
            //   console.log('HTTP request finished');

            //   this.isSubmitting = false;
            // }),

            // finalize(() => {
            //   console.log('BEFORE:', this.isSubmitting);

            //   this.isSubmitting = false;

            //   console.log('AFTER:', this.isSubmitting);
            //   console.log('STATUS:', this.submissionStatus);
            // }),

            finalize(() => {
              console.log('POST /api/v2/grades FINISHED');

              this.isSubmitting = false;

              this.cdr.detectChanges();
            }),
          );
        }),

        takeUntilDestroyed(),
      )
      .subscribe({
        next: (result) => {
          console.log('Grade submission successful:', result);

          this.submissionStatus = `Grade saved successfully! Record ID: ${result.id}`;
        },
      });
  }

  onSubmit(): void {
    if (this.gradeForm.invalid) {
      this.gradeForm.markAllAsTouched();

      return;
    }

    if (this.isSubmitting) {
      return;
    }

    const rawValue = this.gradeForm.getRawValue();

    this.submitClick$.next({
      studentId: Number(rawValue.studentId),

      assessmentId: Number(rawValue.assessmentId),

      score: Number(rawValue.score),
    });
  }
}
