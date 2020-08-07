import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpatientComponent } from './adminpatient.component';

describe('AdminpatientComponent', () => {
  let component: AdminpatientComponent;
  let fixture: ComponentFixture<AdminpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
