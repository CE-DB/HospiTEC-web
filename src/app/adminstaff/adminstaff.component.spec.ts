import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstaffComponent } from './adminstaff.component';

describe('AdminstaffComponent', () => {
  let component: AdminstaffComponent;
  let fixture: ComponentFixture<AdminstaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminstaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
