import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CRUD } from '../interfaces/crud';
import { temporaryDeclaration } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-patientreservation',
  templateUrl: './patientreservation.component.html',
  styleUrls: ['./patientreservation.component.css']
})
export class PatientreservationComponent implements OnInit, CRUD {
  constructor(private router: Router, private apollo: Apollo) {}
  elementList: any[];
  procedureList: any[];
  currentElementIndex: number;
  proceduresToAdd = [];
  proceduresToDelete = [];

  entityQuery = gql`
    query reservations($pi: String!) {
      reservations(patientId: $pi) {
        idBed
        checkInDate
        checkOutDate
        patientId
        procedures {
          recoveringDays
          name
        }
      }
    }
  `;

  procedureQuery = gql`
    {
      procedures {
        name
      }
    }
  `;

  addQuery = gql`
    mutation createReservation($pi: String!, $cd: Date!) {
      createReservation(input: { patientId: $pi, checkInDate: $cd }) {
        patientId
        checkInDate
        checkOutDate
      }
    }
  `;

  addProcedure = gql`
    mutation createProcedureReserved(
      $pi: String!
      $cd: Date!
      $icu: Boolean!
      $n: String!
    ) {
      createProcedureReserved(
        input: { patientId: $pi, checkInDate: $cd, icu: $icu, name: $n }
      ) {
        idBed
      }
    }
  `;

  updateQuery = gql`
  mutation updateReservationProcedures($pi: String!, $cd: Date!, $np: [String!], $dp: [String!], $icu: Boolean!){
    updateReservationProcedures(input: {
      patientId: $pi
	    checkInDate: $cd
	    newProcedures: $np
	    deletedProcedures: $dp
	    icu: $icu
      
    }) {
      patientId
    }
  }`;

  deleteQuery = gql`
  mutation deleteReservation($pi: String!, $d: Date!){
    deleteReservation(patientId: $pi, checkInDate: $d) {
      patientId
    }
  }`;

  selectElement(event: any): void {
    let i;
    for (i = 0; i < this.elementList.length; i++) {
      if (this.elementList[i].idBed == event) {
        this.currentElementIndex = i;
        break;
      }
    }

    let tempDoc = <HTMLSelectElement>(
      document.getElementById('proceduresShow'));
      for(i = 0; i < this.elementList[this.currentElementIndex].procedures.length; i++) {
      var newOpt = document.createElement('option');
      newOpt.value, (newOpt.innerHTML = this.procedureList[i].name);
      newOpt.id = i;
      tempDoc.appendChild(newOpt);
    }
  }

  addElement(event: any): void {
    try {
      this.apollo
        .mutate<any>({
          mutation: this.addQuery,
          refetchQueries: [{ query: this.entityQuery }],
          variables: {
            pi: localStorage.getItem('patientid'),
            cd: new Date(
              (<HTMLInputElement>document.getElementById('get1')).value
            )
          }
        })
        .subscribe(
          ({ data }) => {
            document.getElementById('creationFeedback').innerHTML =
              'Sucessfully added reservation.';
          },
          errors => {
            document.getElementById('creationFeedback').innerHTML = errors;
          }
        );

      let tempDoc = <HTMLSelectElement>(
        document.getElementById('proceduresSelect')
      );
      let tempDoc2 = <HTMLSelectElement>document.getElementById('icuSelect');
      this.apollo
        .mutate<any>({
          mutation: this.addProcedure,
          variables: {
            pi: localStorage.getItem('patientid'),
            cd: new Date(
              (<HTMLInputElement>document.getElementById('get1')).value
            ),
            n: tempDoc.options[tempDoc.selectedIndex].value,
            icu: tempDoc2.options[tempDoc2.selectedIndex].value == 'true'
          }
        })
        .subscribe(
          ({ data }) => {
            document.getElementById('creationFeedback').innerHTML +=
              '\nSuccessfully added procedure.';
          },
          errors => {
            document.getElementById('creationFeedback').innerHTML +=
              '\n' + errors;
          }
        );
    } catch (e) {
      console.log(e);
    }
  }

  appendProcedureAdded() {
    let tempDoc = (<HTMLSelectElement>document.getElementById("proceduresSelect2"));
    this.proceduresToAdd.push(tempDoc.options[tempDoc.selectedIndex].value);
    document.getElementById("pFeedback").innerHTML = "Added proceduce, update reservation to finish changes";
  }

  appendProcedureDeleted() {
    let tempDoc = (<HTMLSelectElement>document.getElementById("proceduresSelect2"));
    this.proceduresToDelete.push(tempDoc.options[tempDoc.selectedIndex].value);
    document.getElementById("pFeedback").innerHTML = "Deleted proceduce, update reservation to finish changes";
  }

  updateElement(event: any): void {
    try {
      console.log(this.proceduresToAdd);
      let tempDoc = (<HTMLSelectElement>document.getElementById("icuSelectUpdate")).options;
      this.apollo.mutate<any>({
        mutation: this.updateQuery,
        variables: {pi: localStorage.getItem("patientid"),
                    cd: this.elementList[this.currentElementIndex].checkInDate,
                    np: this.proceduresToAdd,
                    dp: this.proceduresToDelete,
                    icu: tempDoc[tempDoc.selectedIndex].value == "true"}
      }).subscribe(({data}) => {
        document.getElementById("editFeedback").innerHTML = "Successfully updated reservation";
      }, (errors) => {
        document.getElementById("editFeedback").innerHTML = errors;
      })
    }
    catch(e) {
      console.log(e);
    }
  }


  deleteElement(event: any): void {
    
  }

  setProcedureDropdown() {
    let tempDoc = <HTMLSelectElement>(
      document.getElementById('proceduresSelect')
    );
    let tempDoc2 = <HTMLSelectElement>(
      document.getElementById('proceduresSelect2')
    );
    let i;
    for (i = 0; i < this.procedureList.length; i++) {
      var newOpt = document.createElement('option');
      newOpt.value, (newOpt.innerHTML = this.procedureList[i].name);
      newOpt.id = i;
      tempDoc.appendChild(newOpt);
      tempDoc2.appendChild(newOpt);
    }
  }

  selectProcedure() {}

  ngOnInit(): void {
    if (!localStorage.getItem('PatientToken')) {
      this.router.navigate(['/patientlogin']);
    }

    this.apollo
      .watchQuery<any>({
        query: this.entityQuery,
        variables: { pi: localStorage.getItem('patientid') }
      })
      .valueChanges.subscribe(signal => {
        this.elementList = signal.data.reservations;
      });

    this.apollo
      .watchQuery<any>({
        query: this.procedureQuery,
        variables: { pi: localStorage.getItem('patientid') }
      })
      .valueChanges.subscribe(signal => {
        this.procedureList = signal.data.procedures;
        this.setProcedureDropdown();
      });
  }
}
