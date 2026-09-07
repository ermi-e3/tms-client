// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { InstructorDashboardComponent } from './instructor-dashboard.component';

// describe('InstructorDashboardComponent', () => {
//   let component: InstructorDashboardComponent;
//   let fixture: ComponentFixture<InstructorDashboardComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [InstructorDashboardComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(InstructorDashboardComponent);
//     component = fixture.componentInstance;
//     await fixture.whenStable();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { InstructorDashboardComponent } from './instructor-dashboard.component';
import { LiveSync } from '../../services/live-sync';

describe('InstructorDashboardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorDashboardComponent],
      providers: [
        provideRouter([]),
        {
          provide: LiveSync,
          useValue: {
            events$: {
              subscribe: () => ({
                unsubscribe: () => {},
              }),
            },
            connectionState: {
              // enough for the component if it reads connectionState()
              call: () => 'disconnected',
            },
            connect: () => {},
            disconnect: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(InstructorDashboardComponent);

    expect(fixture.componentInstance).toBeTruthy();
  });
});