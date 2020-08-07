import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbedComponent } from './adminbed.component';

describe('AdminbedComponent', () => {
  let component: AdminbedComponent;
  let fixture: ComponentFixture<AdminbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminbedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
