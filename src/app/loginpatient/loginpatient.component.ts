import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-loginpatient',
  templateUrl: './loginpatient.component.html',
  styleUrls: ['./loginpatient.component.css']
})
export class LoginpatientComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  sendInfo() {
    let userString = (<HTMLInputElement>document.getElementById("user")).value;
    let passString = (<HTMLInputElement>document.getElementById("pass")).value;
    /*
    pedit auth token conforme rol
    */


    localStorage.setItem("PatientToken", passString);
    this.router.navigate(["/patient"]);

  }

}
