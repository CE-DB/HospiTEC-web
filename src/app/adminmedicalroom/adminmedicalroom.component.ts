import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-adminmedicalroom',
  templateUrl: './adminmedicalroom.component.html',
  styleUrls: ['./adminmedicalroom.component.css']
})
export class AdminmedicalroomComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem("AdminToken")) {
      this.router.navigate(["/adminlogin"]);
    }
  }

}

