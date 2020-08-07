import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorpatientComponent } from './doctorpatient.component';

describe('DoctorpatientComponent', () => {
  let component: DoctorpatientComponent;
  let fixture: ComponentFixture<DoctorpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
