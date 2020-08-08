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


  updateQuery: object;
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
                    birthDate: new Date((<HTMLInputElement>document.getElementById("get8")).value.split("T")[0])}
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
        localStorage.setItem("patientid", data.addPassword.identification);
      }, (error) => {
        document.getElementById("authFeedback").innerHTML = error;
      })
    }
    catch(e) {
      console.log(e);
    }
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

   this.apollo.watchQuery<any>({
    query: this.entityQuery
  }).valueChanges.subscribe(signal => {
    this.elementList = signal.data.patients;
  })
  }

  

}
