import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-patientrecord',
  templateUrl: './patientrecord.component.html',
  styleUrls: ['./patientrecord.component.css']
})
export class PatientrecordComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem("PatientToken")) {
      this.router.navigate(["/patientlogin"]);
    }
  }

}
