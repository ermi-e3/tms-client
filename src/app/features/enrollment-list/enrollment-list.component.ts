// import { Component, inject, OnInit } from '@angular/core';
// import { EnrollmentStore } from '../../store/enrollment.store';

// @Component({
//   selector: 'app-enrollment-list',
//   imports: [],
//   templateUrl: './enrollment-list.component.html',
// })
// @Component({
//   selector: 'tms-enrollment-list',
//   standalone: true,
//   templateUrl: './enrollment-list.component.html',
//   styleUrl: './enrollment-list.component.scss',
// })

// export class EnrollmentListComponent implements OnInit {
//   store = inject(EnrollmentStore);
//   ngOnInit() {
//     this.store.loadEnrollments();
//   }
//   onApprove(id: string) {
//     this.store.approveEnrollment(id);
//   }
// }

import { Component, OnInit, inject } from '@angular/core';
import { EnrollmentStore } from '../../store/enrollment.store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'tms-enrollment-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './enrollment-list.component.html',
  styleUrl: './enrollment-list.component.scss',
})
export class EnrollmentListComponent implements OnInit {
  store = inject(EnrollmentStore);

  ngOnInit(): void {
    this.store.loadEnrollments();
  }

  onApprove(id: string): void {
    this.store.approveEnrollment(id);
  }
}
