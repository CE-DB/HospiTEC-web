import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CRUD } from '../interfaces/crud';
import { parse } from 'path';

@Component({
  selector: 'app-adminmedicalroom',
  templateUrl: './adminmedicalroom.component.html',
  styleUrls: ['./adminmedicalroom.component.css']
})
export class AdminmedicalroomComponent implements OnInit, CRUD {
  constructor(private router: Router, private apollo: Apollo) {}
  elementList: any[];
  currentElementIndex: number;

  entityQuery = gql`
    {
      medicalRooms {
        id
        floorNumber
        name
        capacity
        careType
      }
    }
  `;

  addQuery = gql`
  mutation addMedicalRoom($id: Int!, $fn: Short!, $n: String!, $c: Short!, $ct: String!) {
    addMedicalRoom(input: {
      id: $id
      floorNumber: $fn
      name: $n
      capacity: $c
      careType: $ct
    }) {
      name
    }
  }`;
  
  updateQuery = gql`
  mutation updateMedicalRoom($oi: Int!, $ni: Int, $fn: Short, $n: String, $c: Short, $ct: String){
    updateMedicalRoom(input: {
      oldId: $oi
      newId: $ni
      floorNumber: $fn
      name: $n
      capacity: $c
      careType: $ct
    }) {
      name
    }
  }`;

  deleteQuery = gql`
  mutation deleteMedicalRoom($id: Int!) {
    deleteMedicalRoom(id: $id) {
      name
    }
  }`;
  
  selectElement(event: any): void {
    let i;
    for(i = 0; this.elementList.length; i++) {
      if (this.elementList[i].id == event) {
        this.currentElementIndex = i;
      }
    }
  }

  addElement(event: any): void {
   try {
    this.apollo.mutate<any>({
      mutation: this.addQuery,
      refetchQueries: [{query: this.entityQuery}],
      variables: {id: parseInt((<HTMLInputElement>document.getElementById("get1")).value),
                  n: (<HTMLInputElement>document.getElementById("get3")).value,
                  fn: parseInt((<HTMLInputElement>document.getElementById("get2")).value),
                  c: parseInt((<HTMLInputElement>document.getElementById("get4")).value),
                  ct: (<HTMLInputElement>document.getElementById("get5")).value}
    }).subscribe(({data}) => {
      document.getElementById("creationFeedback").innerHTML = "Created medical room";
    }, (errors) => {
      document.getElementById("creationFeedback").innerHTML = errors;
    })
   }
   catch(e) {
     console.log(e);
   }
  }
  
  updateElement(event: any): void {
    try {
      this.apollo.mutate<any>({
        mutation: this.updateQuery,
        refetchQueries: [{query: this.entityQuery}],
        variables: {oi: this.elementList[this.currentElementIndex].id,
                    n: (<HTMLInputElement>document.getElementById("input0")).value,
                    ni: parseInt((<HTMLInputElement>document.getElementById("input1")).value),
                    fn: parseInt((<HTMLInputElement>document.getElementById("input2")).value),
                    c: parseInt((<HTMLInputElement>document.getElementById("input3")).value),
                    ct: (<HTMLInputElement>document.getElementById("input4")).value}
      }).subscribe(({data}) => {
        document.getElementById("updateFeedback").innerHTML = "Updated medical room";
      }, (errors) => {
        document.getElementById("updateFeedback").innerHTML = errors;
      })
    }
    catch(e) {
      console.log(e);
    }
  }
  
  deleteElement(event: any): void {
    try {
      this.apollo.mutate<any>({
        mutation: this.deleteQuery,
        refetchQueries: [{query: this.entityQuery}],
        variables: {id: this.elementList[this.currentElementIndex].id}
      }).subscribe(({data}) => {
        document.getElementById("updateFeedback").innerHTML = "Deleted medical room";
      }, (errors) => {
        document.getElementById("updateFeedback").innerHTML = errors;
      })
    }
    catch(e) {
      console.log(e);
    }
  }

  ngOnInit(): void {
    if (!localStorage.getItem("AdminToken")) {
      this.router.navigate(["/adminlogin"]);
    }
    

   this.apollo
   .watchQuery<any>({
     query: this.entityQuery
   })
   .valueChanges.subscribe(signal => {
     this.elementList = signal.data.medicalRooms;
   });
  }
}
