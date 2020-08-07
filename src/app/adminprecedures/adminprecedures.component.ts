import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-adminprecedures',
  templateUrl: './adminprecedures.component.html',
  styleUrls: ['./adminprecedures.component.css']
})
export class AdminpreceduresComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem("AdminToken")) {
      this.router.navigate(["/adminlogin"]);
    }
  }

}
