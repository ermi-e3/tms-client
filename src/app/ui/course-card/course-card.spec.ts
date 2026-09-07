// // import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { TestBed } from '@angular/core/testing';
// import { provideRouter } from '@angular/router';
// import { CourseCard } from './course-card';



// describe('CourseCardComponent', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [provideRouter([])],
//     });
//   });
//   it('should display the course title', async () => {
//     const fixture = TestBed.createComponent(CourseCard);
//     // Set signal-based required input
//     fixture.componentRef.setInput('course', {
//       id: 1,
//       code: 'CSE-101',
//       title: 'Advanced Web Dev',
//       maxCapacity: 30,
//       enrollmentCount: 12,
//     });
//     await fixture.whenStable();
//     const el = fixture.nativeElement as HTMLElement;
//     expect(el.textContent).toContain('Advanced Web Dev');
//   });
//   it('should emit enrollClicked event when button is clicked', async () => {
//     const fixture = TestBed.createComponent(CourseCard);
//     const component = fixture.componentInstance;
//     fixture.componentRef.setInput('course', {
//       id: 1,
//       code: 'CSE-101',
//       title: 'Advanced Web Dev',
//       maxCapacity: 30,
//       enrollmentCount: 12,
//     });
//     await fixture.whenStable();
//     let emittedCourse: any = null;
//     component.enrollClicked.subscribe((c: any) => (emittedCourse = c));
//     const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
//     button.click();
//     await fixture.whenStable();
//     expect(emittedCourse).toBeTruthy();
//     expect(emittedCourse.title).toBe('Advanced Web Dev');
//   });
// });

import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CourseCard } from './course-card';

describe('CourseCard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
  });

  it('should display the course title', async () => {
    const fixture = TestBed.createComponent(CourseCard);

    fixture.componentRef.setInput('course', {
      id: 1,
      code: 'CSE-101',
      title: 'Advanced Web Dev',
      maxCapacity: 30,
      enrollmentCount: 12,
    });

    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain('Advanced Web Dev');
  });

  it('should emit enrollClicked when the Enroll button is clicked', async () => {
    const fixture = TestBed.createComponent(CourseCard);

    const component = fixture.componentInstance;

    const course = {
      id: 1,
      code: 'CSE-101',
      title: 'Advanced Web Dev',
      maxCapacity: 30,
      enrollmentCount: 12,
    };

    fixture.componentRef.setInput('course', course);

    await fixture.whenStable();

    let emittedCourse: typeof course | undefined;

    component.enrollClicked.subscribe((value) => {
      emittedCourse = value;
    });

    const button =
      fixture.nativeElement.querySelector(
        'button'
      ) as HTMLButtonElement;

    expect(button).toBeTruthy();
    expect(button.disabled).toBe(false);

    button.click();

    expect(emittedCourse).toEqual(course);
  });
});