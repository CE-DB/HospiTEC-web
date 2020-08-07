import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-patientevaluation',
  templateUrl: './patientevaluation.component.html',
  styleUrls: ['./patientevaluation.component.css']
})
export class PatientevaluationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem("PatientToken")) {
      this.router.navigate(["/patientlogin"]);
    }
  }

}
