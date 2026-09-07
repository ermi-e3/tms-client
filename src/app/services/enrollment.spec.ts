

// describe('EnrollmentService', () => {
//   let httpMock: HttpTestingController;
//   let service: EnrollmentService;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [provideHttpClient(), provideHttpClientTesting()],
//     });
//     httpMock = TestBed.inject(HttpTestingController);
//     service = TestBed.inject(EnrollmentService);
//   });
//   afterEach(() => httpMock.verify());
//   it('getAll() issues GET /api/enrollments and maps the response', async () => {
//     const result = firstValueFrom(service.getAll());
//     const req = httpMock.expectOne((r) => r.url.endsWith('/api/enrollments'));
//     expect(req.request.method).toBe('GET');
//     req.flush([
//       {
//         id: 1,
//         studentId: 11,
//         studentName: 'Abeba',
//         courseId: 101,
//         courseName: 'Intro to CS',
//         status: 'Pending',
//         enrolledAt: '2026-08-12T10:00:00Z',
//       },
//       {
//         id: 2,
//         studentId: 12,
//         studentName: 'Kebede',
//         courseId: 102,
//         courseName: 'Data Structures',
//         status: 'Approved',
//         enrolledAt: '2026-08-12T10:05:00Z',
//       },
//     ]);
//     const enrollments = await result;
//     expect(enrollments).toHaveLength(2);
//     expect(enrollments[0].courseName).toBe('Intro to CS');
//   });
//   it('approve(id) issues POT /api/enrollments/{id}/approve', async () => {
//     const result = firstValueFrom(service.approve(42));
//     const req = httpMock.expectOne((r) => r.url.endsWith('/api/enrollments/42/approve'));
//     expect(req.request.method).toBe('POT');
//     req.flush({
//       id: 42,
//       studentId: 11,
//       studentName: 'Abeba',
//       courseId: 101,
//       courseName: 'Intro to CS',
//       status: 'Approved',
//       enrolledAt: '2026-08-12T10:00:00Z',
//     });
//     const approved = await result;
//     expect(approved.status).toBe('Approved');
//   });
// });


// import { TestBed } from '@angular/core/testing';
// import { provideHttpClient } from '@angular/common/http';
// import {
//   HttpTestingController,
//   provideHttpClientTesting,
// } from '@angular/common/http/testing';
// import { firstValueFrom } from 'rxjs';

// import { EnrollmentService } from './enrollment';

// describe('EnrollmentService', () => {
//   let service: EnrollmentService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         provideHttpClient(),
//         provideHttpClientTesting(),
//       ],
//     });

//     service = TestBed.inject(EnrollmentService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('getAll() should issue GET /api/v2/enrollments and return enrollments', async () => {
//     const result = firstValueFrom(service.getAll());

//     const request = httpMock.expectOne(
//       (req) =>
//         req.url ===
//         'http://localhost:5022/api/v2/enrollments'
//     );

//     expect(request.request.method).toBe('GET');

//     request.flush([
//       {
//         id: 1,
//         studentId: 11,
//         studentName: 'Abeba',
//         courseId: 101,
//         courseTitle: 'Intro to CS',
//         status: 'Pending',
//         enrolledAt: '2026-08-12T10:00:00Z',
//       },
//       {
//         id: 2,
//         studentId: 12,
//         studentName: 'Kebede',
//         courseId: 102,
//         courseTitle: 'Data Structures',
//         status: 'Approved',
//         enrolledAt: '2026-08-12T10:05:00Z',
//       },
//     ]);

//     const enrollments = await result;

//     expect(enrollments).toHaveLength(2);
//     expect(enrollments[0].studentName).toBe('Abeba');
//     expect(enrollments[0].courseTitle).toBe('Intro to CS');
//     expect(enrollments[0].status).toBe('Pending');
//   });

//   it('approve(id) should issue POST /api/v2/enrollments/{id}/approve', async () => {
//     const result = firstValueFrom(service.approve(42));

//     const request = httpMock.expectOne(
//       'http://localhost:5022/api/v2/enrollments/42/approve'
//     );

//     expect(request.request.method).toBe('POST');
//     expect(request.request.body).toEqual({});

//     request.flush(null);

//     const response = await result;

//     expect(response).toBeUndefined();
//   });

//   it('reject(id) should issue POST /api/v2/enrollments/{id}/reject', async () => {
//     const result = firstValueFrom(service.reject(42));

//     const request = httpMock.expectOne(
//       'http://localhost:5022/api/v2/enrollments/42/reject'
//     );

//     expect(request.request.method).toBe('POST');
//     expect(request.request.body).toEqual({});

//     request.flush(null);

//     const response = await result;

//     expect(response).toBeUndefined();
//   });
// });


/// ###################################################################################################


import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

import { EnrollmentService } from './enrollment';

describe('EnrollmentService', () => {
  let service: EnrollmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(EnrollmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getAll() should issue GET /api/v2/enrollments and return enrollments', async () => {
    const result = firstValueFrom(service.getAll());

    const request = httpMock.expectOne(
      'http://localhost:5022/api/v2/enrollments'
    );

    expect(request.request.method).toBe('GET');

    request.flush([
      {
        id: 1,
        studentId: 11,
        studentName: 'Abeba',
        courseId: 101,
        courseTitle: 'Intro to CS',
        status: 'Pending',
        enrolledAt: '2026-08-12T10:00:00Z',
      },
      {
        id: 2,
        studentId: 12,
        studentName: 'Kebede',
        courseId: 102,
        courseTitle: 'Data Structures',
        status: 'Approved',
        enrolledAt: '2026-08-12T10:05:00Z',
      },
    ]);

    const enrollments = await result;

    expect(enrollments).toHaveLength(2);
    expect(enrollments[0].studentName).toBe('Abeba');
    expect(enrollments[0].courseTitle).toBe('Intro to CS');
    expect(enrollments[0].status).toBe('Pending');
  });

  it('approve(id) should issue POST /api/v2/enrollments/{id}/approve', async () => {
    const result = firstValueFrom(service.approve(42));

    const request = httpMock.expectOne(
      'http://localhost:5022/api/v2/enrollments/42/approve'
    );

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({});

    request.flush(null);

    const response = await result;

    expect(response).toBeNull();
  });

  it('reject(id) should issue POST /api/v2/enrollments/{id}/reject', async () => {
    const result = firstValueFrom(service.reject(42));

    const request = httpMock.expectOne(
      'http://localhost:5022/api/v2/enrollments/42/reject'
    );

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({});

    request.flush(null);

    const response = await result;

    expect(response).toBeNull();
  });
});