import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-adminreport',
  templateUrl: './adminreport.component.html',
  styleUrls: ['./adminreport.component.css']
})
export class AdminreportComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem("AdminToken")) {
      this.router.navigate(["/adminlogin"]);
    }
  }

}
