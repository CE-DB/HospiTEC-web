import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-patientreservation',
  templateUrl: './patientreservation.component.html',
  styleUrls: ['./patientreservation.component.css']
})
export class PatientreservationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem("PatientToken")) {
      this.router.navigate(["/patientlogin"]);
    }
  }

}
