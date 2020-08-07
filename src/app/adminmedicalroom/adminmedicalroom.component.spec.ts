import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmedicalroomComponent } from './adminmedicalroom.component';

describe('AdminmedicalroomComponent', () => {
  let component: AdminmedicalroomComponent;
  let fixture: ComponentFixture<AdminmedicalroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminmedicalroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmedicalroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
