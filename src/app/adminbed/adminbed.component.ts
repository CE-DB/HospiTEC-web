import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CRUD } from '../interfaces/crud';

@Component({
  selector: 'app-adminbed',
  templateUrl: './adminbed.component.html',
  styleUrls: ['./adminbed.component.css']
})
export class AdminbedComponent implements OnInit, CRUD {
  constructor(private router: Router, private apollo: Apollo) {}
  elementList: any[];
  currentElementIndex: number;

  entityQuery = gql`
    {
      beds {
        id
        isIcu
        idRoom
        equipment {
          name
        }
      }
    }
  `;

  updateQuery = gql`
  mutation updateBed($obid: Int!, $nbid: Int, $isICU: Boolean, $ir: Int) {
    updateBed(input: {
      oldBedId: $obid
      newBedId: $nbid
      isIcu: $isICU
      idRoom: $ir
    }) {
      id
    }
  }`;

  updateEquipmentQuery: object;

  addQuery = gql`
    mutation createBed($id: Int!, $isICU: Boolean!, $idRoom: Int) {
      createBed(id: $id, isICU: $isICU, idRoom: $idRoom) {
        id
      }
    }
  `;

  deleteQuery = gql`
  mutation deleteBed($bid: Int!) {
    deleteBed(bedId: $bid) {
      id
    }
  }`;

  selectElement(event: any): void {
    let i;
    for (i = 0; this.elementList.length; i++) {
      if (this.elementList[i].id == event) {
        this.currentElementIndex = i;
      }
    }
  }
  addElement(event: any): void {
    try {
      this.apollo
        .mutate<any>({
          mutation: this.addQuery,
          refetchQueries: [{ query: this.entityQuery }],
          variables: { id: parseInt((<HTMLInputElement>document.getElementById("get1")).value),
                      isICU: (<HTMLInputElement>document.getElementById("get1")).value == "true",
                      idRoom: parseInt((<HTMLInputElement>document.getElementById("get2")).value),
                    }
        })
        .subscribe(
          ({ data }) => {
            document.getElementById('creationFeedback').innerHTML =
              'Updated medical room';
          },
          errors => {
            document.getElementById('creationFeedback').innerHTML = errors;
          }
        );
    } catch (e) {
      console.log(e);
    }
  }
  updateElement(event: any): void {
    try {
      this.apollo
        .mutate<any>({
          mutation: this.updateQuery,
          refetchQueries: [{ query: this.entityQuery }],
          variables: { obid: this.elementList[this.currentElementIndex].id,
                      nbid: parseInt((<HTMLInputElement>document.getElementById("input0")).value),
                      isICU: (<HTMLInputElement>document.getElementById("input1")).value == "true",
                    ir: parseInt((<HTMLInputElement>document.getElementById("input2")).value)}
        })
        .subscribe(
          ({ data }) => {
            document.getElementById('updateFeedback').innerHTML =
              'Updated medical room';
          },
          errors => {
            document.getElementById('updateFeedback').innerHTML = errors;
          }
        );
    } catch (e) {
      console.log(e);
    }
  }
  deleteElement(event: any): void {
    try {
      this.apollo
        .mutate<any>({
          mutation: this.deleteQuery,
          refetchQueries: [{ query: this.entityQuery }],
          variables: { bid: this.elementList[this.currentElementIndex].id }
        })
        .subscribe(
          ({ data }) => {
            document.getElementById('updateFeedback').innerHTML =
              'Deleted medical room';
          },
          errors => {
            document.getElementById('updateFeedback').innerHTML = errors;
          }
        );
    } catch (e) {
      console.log(e);
    }
  }

  ngOnInit(): void {
    if (!localStorage.getItem('AdminToken')) {
      this.router.navigate(['/adminlogin']);
    }

    this.apollo
      .watchQuery<any>({
        query: this.entityQuery
      })
      .valueChanges.subscribe(signal => {
        this.elementList = signal.data.beds;
      });
  }
}
