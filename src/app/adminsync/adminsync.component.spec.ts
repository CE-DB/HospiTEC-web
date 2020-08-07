import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsyncComponent } from './adminsync.component';

describe('AdminsyncComponent', () => {
  let component: AdminsyncComponent;
  let fixture: ComponentFixture<AdminsyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
