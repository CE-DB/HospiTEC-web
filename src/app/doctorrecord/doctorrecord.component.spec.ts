import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorrecordComponent } from './doctorrecord.component';

describe('DoctorrecordComponent', () => {
  let component: DoctorrecordComponent;
  let fixture: ComponentFixture<DoctorrecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorrecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
