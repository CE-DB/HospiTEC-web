import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CRUD } from '../interfaces/crud';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { variable } from '@angular/compiler/src/output/output_ast';
import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';


@Component({
  selector: 'app-patientregister',
  templateUrl: './patientregister.component.html',
  styleUrls: ['./patientregister.component.css']
})
export class PatientregisterComponent implements OnInit, CRUD {

  constructor(private apollo: Apollo, private router: Router) { }
  
  alreadyHasProfile = false;

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

  addQuery = gql`
  mutation createPatient($id: String!, $fn: String!, $ln: String!, $pn: String!,
                        $canton: String!, $province: String!, $address: String!,
                        $birthDate: Date!) {
    createPatient(input: {
      id: $id
      firstName: $fn
      lastName: $ln
      phoneNumber: $pn
      canton: $canton
      province: $province
      address: $address
      birthDate: $birthDate
    }) {
      identification
    }
  }`;

  passQuery = gql`
    mutation addPassword($pi: String!, $pass: String!) {
    addPassword(patientId: $pi, password: $pass){
      firstName
      identification
    }
  }`;

  updateQuery = gql`
  mutation updatePatient($oi: String!, $fn: String, $ln: String!, $pn: String, $canton: String!, $province: String!, $address: String!, $bd: Date!){
    updatePatient(input: {
      oldId: $io
      firstName: $fn
      lastName: $ln
      phoneNumber: $pn
      canton: $canton
      province: $province
      address: $address
      birthDate: $bd
    })
  }`;

  deleteQuery: object;
  selectElement(event: any): null {
    throw new Error("Method not implemented.");
  }
  addElement(event: any) {
    try {
      this.apollo.mutate<any>({
        mutation: this.addQuery,
        variables: {id: (<HTMLInputElement>document.getElementById("get1")).value,
                    fn: (<HTMLInputElement>document.getElementById("get2")).value,
                    ln: (<HTMLInputElement>document.getElementById("get3")).value,
                    pn: (<HTMLInputElement>document.getElementById("get4")).value,
                    canton: (<HTMLInputElement>document.getElementById("get5")).value,
                    province: (<HTMLInputElement>document.getElementById("get6")).value,
                    address: (<HTMLInputElement>document.getElementById("get7")).value,
                    birthDate: new Date((<HTMLInputElement>document.getElementById("get8")).value)}
      }).subscribe(({data}) => {
        document.getElementById("creationFeedback").innerHTML = "Successful creation";
        this.addPassword();
      }, (error) => {
        document.getElementById("creationFeedback").innerHTML = error;
      })
    }
    catch(e) {
      console.log(e);
    }
  }

  addPassword() {
    try {
      this.apollo.mutate<any>({
        mutation: this.passQuery,
        variables: {pi: (<HTMLInputElement>document.getElementById("get1")).value,
                    pass: (<HTMLInputElement>document.getElementById("get9")).value}
      }).subscribe(({data}) => {
        document.getElementById("authFeedback").innerHTML = "Created user, log in with identification and password";
        localStorage.setItem("patientid", data.createPatient.identification);
      }, (error) => {
        document.getElementById("authFeedback").innerHTML = error;
      })
    }
    catch(e) {
      console.log(e);
    }
  }

  updateElement(event: any) {
    try {
      this.apollo.mutate<any>({
        mutation: this.updateQuery,
        variables: {oi: (<HTMLInputElement>document.getElementById("input1")).value,
                    fn: (<HTMLInputElement>document.getElementById("input2")).value,
                    pn: (<HTMLInputElement>document.getElementById("input3")).value,
                    province: (<HTMLInputElement>document.getElementById("input4")).value,
                    canton: (<HTMLInputElement>document.getElementById("input5")).value,
                    address: (<HTMLInputElement>document.getElementById("input6")).value,
                    bd: new Date((<HTMLInputElement>document.getElementById("input7")).value)}
      }).subscribe(({data}) => {
          document.getElementById("updateFeedback").innerHTML = "Updated profile";
      }, (error) => {
          document.getElementById("updateFeedback").innerHTML = error;
      })
    }
    catch(e) {
      console.log(e);
    }
  }
  deleteElement(event: any): null {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {

    if (localStorage.getItem("PatientToken") && localStorage.getItem("patientid")) {
      this.alreadyHasProfile = true;

      this.apollo.watchQuery<any>({
        query: this.entityQuery
      }).valueChanges.subscribe(signal => {
        this.elementList = signal.data.patients;
      })

      let i;
      for (i = 0; i < this.elementList.length; i++) {
        if (localStorage.getItem("patientid") == this.elementList[i]) {
          this.currentElementIndex = i;
          break;
        }
      }


    }

  }
}
