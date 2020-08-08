import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CRUD } from '../interfaces/crud';

@Component({
  selector: 'app-adminstaff',
  templateUrl: './adminstaff.component.html',
  styleUrls: ['./adminstaff.component.css']
})
export class AdminstaffComponent implements OnInit, CRUD {
  constructor(private router: Router, private apollo: Apollo) {}
  elementList: any[];
  currentElementIndex: number;

  entityQuery = gql`
    {
      staff {
        person {
          identification
          firstName
          lastName
          birthDate
          phoneNumber
          canton
          province
          exactAddress
          external
        }
        role
        admissionDate
      }
    }
  `;

  addQuery = gql`
    mutation createStaffPerson(
      $id: String!
      $fn: String!
      $ln: String!
      $pn: String!
      $c: String!
      $p: String!
      $a: String!
      $bd: Date!
    ) {
      createStaffPerson(
        input: {
          id: $id
          firstName: $fn
          lastName: $ln
          phoneNumber: $pn
          canton: $c
          province: $p
          address: $a
          birthDate: $bd
        }
      ) {
        person {
          firstName
        }
      }
    }
  `;

  addStaffQuery = gql`
    mutation createStaff($id: String!, $ad: Date!, $r: String!, $p: String!) {
      createStaff(
        input: { id: $id, admissionDate: $ad, role: $r, password: $p }
      ) {
        role
      }
    }
  `;

  updateQuery = gql`
    mutation updateStaff(
      $id: String!
      $or: String!
      $nr: String
      $ad: Date
      $p: String
    ) {
      updateStaff(
        input: {
          id: $id
          oldRole: $or
          newRole: $nr
          admissionDate: $ad
          password: $p
        }
      ) {
        role
      }
    }
  `;

  updatePersonQuery = gql`
    mutation updateStaffPerson(
      $oi: String!
      $fn: String
      $ln: String
      $pn: String
      $c: String
      $p: String
      $a: String
      $bd: Date
    ) {
      updateStaffPerson(
        input: {
          oldId: $oi
          firstName: $fn
          lastName: $ln
          phoneNumber: $pn
          canton: $c
          province: $p
          address: $a
          birthDate: $bd
        }
      ) {
        role
      }
    }
  `;

  deleteQuery = gql`
    mutation deleteStaff($id: String!, $r: String!) {
      deleteStaff(id: $id, role: $r) {
        role
      }
    }
  `;

  deletePersonQuery = gql`
    mutation deleteStaffPerson($id: String!) {
      deleteStaffPerson(id: $id) {
        firstName
      }
    }
  `;

  selectElement(event: any): void {
    let i;
    for (i = 0; i < this.elementList.length; i++) {
      if (
        this.elementList[i].person.identification ===
        event.target.attributes.id.nodeValue
      ) {
        this.currentElementIndex = i;
        break;
      }
    }
  }

  addElement(event: any): void {
    try {
      this.apollo
        .mutate<any>({
          mutation: this.addQuery,
          variables: {
            id: (<HTMLInputElement>document.getElementById('get1')).value,
            fn: (<HTMLInputElement>document.getElementById('get2')).value,
            ln: (<HTMLInputElement>document.getElementById('get3')).value,
            pn: (<HTMLInputElement>document.getElementById('get4')).value,
            c: (<HTMLInputElement>document.getElementById('get5')).value,
            p: (<HTMLInputElement>document.getElementById('get6')).value,
            a: (<HTMLInputElement>document.getElementById('get7')).value,
            bd: new Date(
              (<HTMLInputElement>document.getElementById('get8')).value
            )
          }
        })
        .subscribe(
          ({ data }) => {
            document.getElementById('creationFeedback').innerHTML +=
              'Added person.';
            this.addStaff();
          },
          errors => {
            document.getElementById('creationFeedback').innerHTML = errors;
          }
        );
    } catch (e) {
      console.log(e);
    }
  }

  addStaff() {
    try {
      this.apollo
        .mutate<any>({
          mutation: this.addStaffQuery,
          refetchQueries: [{ query: this.entityQuery }],
          variables: {
            id: (<HTMLInputElement>document.getElementById('get1')).value,
            ad: new Date(
              (<HTMLInputElement>document.getElementById('get10')).value
            ),
            r: (<HTMLInputElement>document.getElementById('get9')).value,
            p: (<HTMLInputElement>document.getElementById('get11')).value
          }
        })
        .subscribe(
          ({ data }) => {
            document.getElementById('creationFeedback').innerHTML +=
              'Added staff';
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
          variables: {
            id: this.elementList[this.currentElementIndex].person
              .identification,
            or: this.elementList[this.currentElementIndex].role,
            nr: (<HTMLInputElement>document.getElementById('input0')).nodeValue,
            ad: new Date(
              (<HTMLInputElement>document.getElementById('input8')).nodeValue
            ),
            p: (<HTMLInputElement>document.getElementById('input9')).nodeValue
          }
        })
        .subscribe(
          ({ data }) => {
            document.getElementById('updateFeedback').innerHTML +=
              'Updated staff member';
          },
          errors => {
            document.getElementById('updateFeedback').innerHTML += errors;
          }
        );

      this.apollo
        .mutate<any>({
          mutation: this.updatePersonQuery,
          refetchQueries: [{ query: this.entityQuery }],
          variables: {
            oi: this.elementList[this.currentElementIndex].person
              .identification,
            fn: (<HTMLInputElement>document.getElementById('input1')).nodeValue,
            ln: (<HTMLInputElement>document.getElementById('input2')).nodeValue,
            pn: (<HTMLInputElement>document.getElementById('input3')).nodeValue,
            p: (<HTMLInputElement>document.getElementById('input4')).nodeValue,
            c: (<HTMLInputElement>document.getElementById('input5')).nodeValue,
            a: (<HTMLInputElement>document.getElementById('input6')).nodeValue,
            bd: new Date(
              (<HTMLInputElement>document.getElementById('input7')).nodeValue
            )
          }
        })
        .subscribe(
          ({ data }) => {
            document.getElementById('updateFeedback').innerHTML +=
              'Updated staff member personal info';
          },
          errors => {
            document.getElementById('updateFeedback').innerHTML += errors;
          }
        );
    } catch (e) {}
  }

  deleteElement(event: any): void {
    this.apollo
      .mutate<any>({
        mutation: this.deleteQuery,
        variables: {
          id: this.elementList[this.currentElementIndex].person.identification,
          r: this.elementList[this.currentElementIndex].role
        }
      })
      .subscribe(
        ({ data }) => {
          document.getElementById('updateFeedback').innerHTML +=
            'Deleted staff member personal info';
          // this.deleteStaff();
        },
        errors => {
          document.getElementById('updateFeedback').innerHTML += errors;
        }
      );
  }

  deleteStaff() {
    this.apollo
      .mutate<any>({
        mutation: this.deletePersonQuery,
        refetchQueries: [{ query: this.entityQuery }],
        variables: {
          id: this.elementList[this.currentElementIndex].person.identification
        }
      })
      .subscribe(
        ({ data }) => {
          document.getElementById('updateFeedback').innerHTML +=
            'Deleted staff member personal info';
          this.deleteStaff();
        },
        errors => {
          document.getElementById('updateFeedback').innerHTML += errors;
        }
      );
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
        this.elementList = signal.data.staff;
      });
  }
}
