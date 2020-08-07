import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientreservationComponent } from './patientreservation.component';

describe('PatientreservationComponent', () => {
  let component: PatientreservationComponent;
  let fixture: ComponentFixture<PatientreservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientreservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
