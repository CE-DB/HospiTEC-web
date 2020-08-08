import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CRUD } from '../interfaces/crud';

@Component({
  selector: 'app-adminprecedures',
  templateUrl: './adminprecedures.component.html',
  styleUrls: ['./adminprecedures.component.css']
})
export class AdminpreceduresComponent implements OnInit, CRUD {
  constructor(private router: Router, private apollo: Apollo) {}
  elementList: any[];
  currentElementIndex: number;

  entityQuery = gql`
    {
      procedures {
        name
        recoveringDays
      }
    }
  `;

  addQuery = gql`
  mutation createProcedure($n: String!, $rd: Short!){
    createProcedure(name: $n, recoveringDays: $rd) {
      name
    }
  }`
  
  updateQuery = gql`
  mutation updateProcedure($on: String!, $nn: String, $rd: Short){
  updateProcedure(oldName: $on, newName: $nn, recoveringDays: $rd) {
   name 
  }
  }`;

  deleteQuery = gql`
  mutation deleteProcedure($n: String!){
    deleteProcedure(name: $n) {
      name
    }
  }`;
  
  selectElement(event: any): void {
    let i;
    for(i = 0; this.elementList.length; i++) {
      if (this.elementList[i].name == event) {
        this.currentElementIndex = i;
      }
    }
  }

  addElement(event: any): void {
    try {
      this.apollo.mutate<any>({
        mutation: this.addQuery,
        refetchQueries: [{query: this.entityQuery}],
        variables: {n: (<HTMLInputElement>document.getElementById("get1")).value,
                    rd: parseInt((<HTMLInputElement>document.getElementById("get2")).value)}
      }).subscribe(({data}) => {
        document.getElementById("creationFeedback").innerHTML = "Created procedure";
      }, (errors) => {
        document.getElementById("creationFeedback").innerHTML = errors;
      })
    }
    catch(e) {
      console.log(e)
    }
  }
  updateElement(event: any): void {
    try {
      this.apollo.mutate<any>({
        mutation: this.updateQuery,
        refetchQueries: [{query: this.entityQuery}],
        variables: {on: this.elementList[this.currentElementIndex].name,
                    nn: (<HTMLInputElement>document.getElementById("input0")).value,
                    rd: parseInt((<HTMLInputElement>document.getElementById("input1")).value)}
      }).subscribe(({data}) => {
        document.getElementById("updateFeedback").innerHTML = "Updated procedure";
      }, (errors) => {
        document.getElementById("updateFeedback").innerHTML = errors;
      })
    }
    catch(e) {
      console.log(e)
    }
  }
  deleteElement(event: any): void {
    try {
      this.apollo.mutate<any>({
        mutation: this.deleteQuery,
        refetchQueries: [{query: this.entityQuery}],
        variables: {n: this.elementList[this.currentElementIndex].name}
      }).subscribe(({data}) => {
        document.getElementById("updateFeedback").innerHTML = "Deleted procedure";
      }, (errors) => {
        document.getElementById("updateFeedback").innerHTML = errors;
      })
    }
    catch(e) {
      console.log(e)
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
        this.elementList = signal.data.procedures;
      });
  }
}
