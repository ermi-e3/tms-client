import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCatalogComponent } from './course-catalog.component';

describe('CourseCatalogComponent', () => {
  let component: CourseCatalogComponent;
  let fixture: ComponentFixture<CourseCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCatalogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCatalogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
