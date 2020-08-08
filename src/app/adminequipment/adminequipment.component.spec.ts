import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminequipmentComponent } from './adminequipment.component';

describe('AdminequipmentComponent', () => {
  let component: AdminequipmentComponent;
  let fixture: ComponentFixture<AdminequipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminequipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminequipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
