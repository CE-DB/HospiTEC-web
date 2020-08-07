import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CRUD } from '../interfaces/crud';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";


@Component({
  selector: 'app-patientregister',
  templateUrl: './patientregister.component.html',
  styleUrls: ['./patientregister.component.css']
})
export class PatientregisterComponent implements OnInit, CRUD {

  constructor(private apollo: Apollo, private router: Router) { }
  elementList: any[];
  currentElementIndex: number;

  entityQuery = gql`
  {
    patients {
      identification
      firstName
      lastName
      phoneNumber
      canton
      province
      exactAddress
      birthDate
    }
  }`;

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

    if (!localStorage.getItem("PatientToken")) {
      this.router.navigate(["/patientlogin"]);
    }

    this.apollo.watchQuery<any>({
      query: this.entityQuery
    }).valueChanges.subscribe(signal => {
      this.elementList = signal.data.patients;
    })
  }
}
