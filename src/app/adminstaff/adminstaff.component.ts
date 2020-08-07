import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-adminstaff',
  templateUrl: './adminstaff.component.html',
  styleUrls: ['./adminstaff.component.css']
})
export class AdminstaffComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem("AdminToken")) {
      this.router.navigate(["/adminlogin"]);
    }
  }

}