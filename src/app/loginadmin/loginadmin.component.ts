import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  sendInfo() {
    let userString = (<HTMLInputElement>document.getElementById("user")).value;
    let passString = (<HTMLInputElement>document.getElementById("pass")).value;
    /*
    pedit auth token conforme rol
    */


    localStorage.setItem("AdminToken", passString);
    this.router.navigate(["/admin"]);

  }

}
