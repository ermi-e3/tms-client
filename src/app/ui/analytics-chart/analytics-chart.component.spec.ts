// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AnalyticsChartComponent } from './analytics-chart.component';

// describe('AnalyticsChartComponent', () => {
//   let component: AnalyticsChartComponent;
//   let fixture: ComponentFixture<AnalyticsChartComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AnalyticsChartComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(AnalyticsChartComponent);
//     component = fixture.componentInstance;
//     await fixture.whenStable();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


// import { TestBed } from '@angular/core/testing';
// import { AnalyticsChartComponent } from './analytics-chart.component';

// describe('AnalyticsChartComponent', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should create', async () => {
//     const fixture = TestBed.createComponent(AnalyticsChartComponent);

//     fixture.componentRef.setInput('data', []);

//     await fixture.whenStable();

//     expect(fixture.componentInstance).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsChartComponent } from './analytics-chart.component';

describe('AnalyticsChartComponent', () => {
  let component: AnalyticsChartComponent;
  let fixture: ComponentFixture<AnalyticsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsChartComponent);

    fixture.componentRef.setInput('data', []);

    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});