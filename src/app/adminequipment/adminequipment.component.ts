import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CRUD } from '../interfaces/crud';

@Component({
  selector: 'app-adminequipment',
  templateUrl: './adminequipment.component.html',
  styleUrls: ['./adminequipment.component.css']
})
export class AdminequipmentComponent implements OnInit, CRUD {
  constructor(private router: Router, private apollo: Apollo) {}
  elementList: any[];
  currentElementIndex: number;

  entityQuery = gql`
    {
      equipment {
        name
        serialNumber
        stock
        provider
      }
    }
  `;

  addQuery = gql`
  mutation createEquipment($sn: String!, $n: String!, $s: Int!, $p: String!){
    createEquipment(input: {
      serialNumber: $sn
      name: $n
      stock: $s
      provider: $p
    }) {
      name
    }
  }`;

  updateQuery = gql`
  mutation updateEquipment($osn: String!, $nsn: String, $n: String, $s: Int, $p: String){
    updateEquipment(input: {
      oldSerialNumber: $osn
      newSerialNumber: $nsn
      name: $n
      stock: $s
      provider: $p
    }) {
      name
    }
  }`;

  deleteQuery = gql`
  mutation deleteEquipment($osn: String!){
    deleteEquipment(serialNumber: $osn) {
      name
    }
  }`;

  selectElement(event: any): void {
    let i;
    for(i = 0; this.elementList.length; i++) {
      if (this.elementList[i].serialNumber == event) {
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
                    sn: (<HTMLInputElement>document.getElementById("get2")).value,
                    s: parseInt((<HTMLInputElement>document.getElementById("get3")).value),
                    p: (<HTMLInputElement>document.getElementById("get4")).value}
      }).subscribe(({data}) => {
        document.getElementById("creationFeedback").innerHTML = "Created equipment"
      }, (errors) => {
        document.getElementById("creationFeedback").innerHTML = errors;
      })
    }
    catch(e) {
      console.log(e);
    }
  }
  updateElement(event: any): void {
    this.apollo.mutate<any>({
      mutation: this.updateQuery,
      refetchQueries: [{query: this.entityQuery}],
      variables: {osn: this.elementList[this.currentElementIndex].serialNumber,
                  n: (<HTMLInputElement>document.getElementById("input0")).value,
                  nsn: (<HTMLInputElement>document.getElementById("input1")).value,
                  s: parseInt((<HTMLInputElement>document.getElementById("input2")).value),
                  p: (<HTMLInputElement>document.getElementById("input3")).value}
    }).subscribe(({data}) => {
      document.getElementById("updateFeedback").innerHTML = "Updated equipment";
    }, (errors) => {
      document.getElementById("updateFeedback").innerHTML = errors;
    })
  }
  deleteElement(event: any): void {
    this.apollo.mutate<any>({
      mutation: this.deleteQuery,
      refetchQueries: [{query: this.entityQuery}],
      variables: {osn: this.elementList[this.currentElementIndex].serialNumber}
    }).subscribe(({data}) => {
      document.getElementById("updateFeedback").innerHTML = "Deleted equipment"
    }, (errors) => {
      document.getElementById("updateFeedback").innerHTML = errors;
    })
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
     this.elementList = signal.data.equipment;
   });
  }
}
