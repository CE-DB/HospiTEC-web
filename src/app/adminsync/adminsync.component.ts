import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-adminsync',
  templateUrl: './adminsync.component.html',
  styleUrls: ['./adminsync.component.css']
})
export class AdminsyncComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem("AdminToken")) {
      this.router.navigate(["/adminlogin"]);
    }
  }

}

