import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-logindoctor',
  templateUrl: './logindoctor.component.html',
  styleUrls: ['./logindoctor.component.css']
})
export class LogindoctorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  sendInfo() {
    let userString = (<HTMLInputElement>document.getElementById("user")).value;
    let passString = (<HTMLInputElement>document.getElementById("pass")).value;
    /*
    pedit auth token conforme rol
    */


    localStorage.setItem("DoctorToken", passString);
    this.router.navigate(["/doctor"]);

  }

}
