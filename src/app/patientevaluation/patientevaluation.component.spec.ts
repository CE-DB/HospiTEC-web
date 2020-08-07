import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientevaluationComponent } from './patientevaluation.component';

describe('PatientevaluationComponent', () => {
  let component: PatientevaluationComponent;
  let fixture: ComponentFixture<PatientevaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientevaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientevaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
