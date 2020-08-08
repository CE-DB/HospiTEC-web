import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {

  roleString = "admin";

  authQuery = gql`
  mutation authentication($id: String!, $pass: String!, $role: String!){
    authentication(id: $id, password: $pass, role: $role) {
      role
      accessKey
    }
  }`

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  sendInfo() {
    try{
      this.apollo.mutate<any>({
        mutation: this.authQuery,
        variables: {id: (<HTMLInputElement>document.getElementById("user")).value,
                    pass: (<HTMLInputElement>document.getElementById("pass")).value,
                    role: this.roleString}
      }).subscribe(({data}) => {
        localStorage.setItem("AdminToken", data.authentication.accessKey);
        this.router.navigate(["/admin"]);
      }, (error) => {
        document.getElementById("feedback").innerHTML = "There was an error, please check the provided information"
      })
    }
    catch(e) {
      document.getElementById("feedback").innerHTML = "There was an error sending the query"
    }
  }


}
