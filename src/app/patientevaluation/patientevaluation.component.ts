import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CRUD } from "../interfaces/crud";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: 'app-patientevaluation',
  templateUrl: './patientevaluation.component.html',
  styleUrls: ['./patientevaluation.component.css']
})
export class PatientevaluationComponent implements OnInit, CRUD {

  constructor(private router: Router, private apollo: Apollo) { }
  yetToReviewHospital = true;
  selectedStaffId: string;
  selectedCategory: number;
  selectedEvaluationHospital: number;
  selectedEvaluationStaff: number;

  entityQuery = gql`
  {
    staff {
      person {
        firstName
        lastName
        identification
      }
      role
    }
  }
  `;

  addQuery = gql`
  mutation hospitalEvaluation($pi: String!, $c: Int!, $e: Int!, $d: Date!){
    hospitalEvaluation(patientID: $pi, category: $c, evaluation: $e, date: $d)
  }
  `;

  addStaffQuery = gql`
  mutation staffEvaluation($pi: String!, $si: String!, $e: Int!, $d: Date!){
    staffEvaluation(patientID: $pi, staffID: $si, evaluation: $e, date: $d)
  }`
  
  
  elementList: any[];
  currentElementIndex: number;
  updateQuery: object;
  deleteQuery: object;

  
  addElement(event: any): void {
    try {
        this.apollo.mutate<any>({
        mutation: this.addQuery,
        variables: {pi: localStorage.getItem("patientid"),
                    c: this.selectedCategory,
                    e: this.selectedEvaluationHospital,
                    d: new Date().toISOString().split('T')[0]}
      }).subscribe(({data}) => {
        (<HTMLLabelElement>document.getElementById("creationFeedback")).innerHTML = "Successfully created hospital evaluation";
        localStorage.setItem("hasReviewed", "true");
      }, (error) => {
        (<HTMLLabelElement>document.getElementById("creationFeedback")).innerHTML = error;
      })
    }
    catch (e) {
      console.log(e);
    }
  }

  addStaffReview(event: any) {
    try {
      this.apollo.mutate<any>({
      mutation: this.addStaffQuery,
      variables: {pi: localStorage.getItem("patientid"),
                  si: this.selectedStaffId,
                  e: this.selectedEvaluationStaff,
                  d: new Date().toISOString().split('T')[0]}
    }).subscribe(({data}) => {
      (<HTMLLabelElement>document.getElementById("creationFeedback2")).innerHTML = "Successfully created staff evaluation";
      localStorage.setItem("hasReviewed", "true");
    }, (error) => {
      (<HTMLLabelElement>document.getElementById("creationFeedback2")).innerHTML = error;
    })
  }
  catch (e) {
    console.log(e);
  }
  }
  
  ngOnInit(): void {
    if (!localStorage.getItem("PatientToken")) {
      this.router.navigate(["/patientlogin"]);
    }
    if(localStorage.getItem("hasReviewed")) {
      this.yetToReviewHospital = false;
    }

    this.apollo.watchQuery<any>({
      query: this.entityQuery,
      variables: {pi: localStorage.getItem("patientid")}
    }).valueChanges.subscribe(signal => {
      this.elementList = signal.data.staff;
    })

  }

  selectedStaffMember(event: any) {
    document.getElementById("staffMember").innerHTML = event;
    this.selectedStaffId = event;
  }

  selectStaffEvaluation() {
    let tempDoc = <HTMLSelectElement>document.getElementById("get3");
    this.selectedEvaluationStaff = tempDoc.selectedIndex + 1;
  }

  selectEvaluation(value) { 
    let tempDoc = <HTMLSelectElement>document.getElementById("get2");
    this.selectedEvaluationHospital = tempDoc.selectedIndex + 1;
  }

  selectElement(event: any): void {
    let tempDoc = <HTMLSelectElement>document.getElementById("get1");
    this.selectedCategory = tempDoc.selectedIndex + 1;
  }
  updateElement(event: any): void {
    throw new Error("Method not implemented.");
  }
  deleteElement(event: any): void {
    throw new Error("Method not implemented.");
  }

  

}
