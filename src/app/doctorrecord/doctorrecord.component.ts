import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-doctorrecord',
  templateUrl: './doctorrecord.component.html',
  styleUrls: ['./doctorrecord.component.css']
})
export class DoctorrecordComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem("DoctorToken")) {
      this.router.navigate(["/doctorlogin"]);
    }
  }

}
