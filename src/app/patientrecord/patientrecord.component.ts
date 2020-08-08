import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CRUD } from "../interfaces/crud";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: 'app-patientrecord',
  templateUrl: './patientrecord.component.html',
  styleUrls: ['./patientrecord.component.css']
})
export class PatientrecordComponent implements OnInit, CRUD {

  constructor(private router: Router, private apollo: Apollo) { }
  elementList: any[];
  currentElementIndex: number;
  currentProcedureIndex: number;
  
  entityQuery = gql`
  query records($pi: String!){
    records(patientId: $pi) {
      Appointment {
        procedure {
          name
          recoveringDays
        }
  	  executionDate
    } 
    treatment
    pathologyName
    diagnosticDate
    }
  }`;

  addQuery: object;
  updateQuery: object;
  deleteQuery: object;

  selectElement(event: any): void {
    let i;
    for(i = 0; i < this.elementList.length; i++) {
      if(this.elementList[i].diagnosticDate === event.target.attributes.id.nodeValue) {
        this.currentElementIndex = i;
        break;
      }
    }

    let tempDoc = <HTMLSelectElement>document.getElementById("proceduresSelect");
    for(i = 0; i < tempDoc.options.length; i++) {
      tempDoc.options[i] = null;
    }

    
    for(i = 0; i < this.elementList[this.currentElementIndex].Appointment.length; i++) {
      var newOpt = document.createElement("option");
      newOpt.value, newOpt.innerHTML = this.elementList[this.currentElementIndex].Appointment[i].procedure.name;
      newOpt.id = i;
      tempDoc.appendChild(newOpt);
    }

  }

  selectProcedure() {
    let tempDoc = <HTMLSelectElement>document.getElementById("proceduresSelect");
    this.currentProcedureIndex = tempDoc.selectedIndex;
  }

  addElement(event: any): void {
    throw new Error("Method not implemented.");
  }
  updateElement(event: any): void {
    throw new Error("Method not implemented.");
  }
  deleteElement(event: any): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    if (!localStorage.getItem("PatientToken")) {
      this.router.navigate(["/patientlogin"]);
    }

    if (localStorage.getItem("patientid")) {

      this.apollo.watchQuery<any>({
        query: this.entityQuery,
        variables: {pi: localStorage.getItem("patientid")}
      }).valueChanges.subscribe(signal => {
        this.elementList = signal.data.records;
      })
    }
    else {
      console.log("Couldn't find patient id")
    }
  }

}
