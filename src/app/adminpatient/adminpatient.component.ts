import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-adminpatient',
  templateUrl: './adminpatient.component.html',
  styleUrls: ['./adminpatient.component.css']
})
export class AdminpatientComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem("AdminToken")) {
      this.router.navigate(["/patientlogin"]);
    }
  }

}
