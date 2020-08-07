import { Component, OnInit } from '@angular/core';
import { CRUD } from '../interfaces/crud';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Router } from "@angular/router";


@Component({
  selector: 'app-doctorpatient',
  templateUrl: './doctorpatient.component.html',
  styleUrls: ['./doctorpatient.component.css']
})
export class DoctorpatientComponent implements OnInit, CRUD {

  constructor(private apollo: Apollo, private router: Router) { }
  elementList: any[];
  currentElementIndex: number;
  entityQuery: object;
  addQuery: object;
  updateQuery: object;
  deleteQuery: object;
  selectElement(event: any): null {
    throw new Error("Method not implemented.");
  }
  addElement(event: any): null {
    throw new Error("Method not implemented.");
  }
  updateElement(event: any): null {
    throw new Error("Method not implemented.");
  }
  deleteElement(event: any): null {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    if (!localStorage.getItem("DoctorToken")) {
      this.router.navigate(["/doctorlogin"]);
    }
  }

  

}
