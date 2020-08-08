import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminbedComponent } from './adminbed/adminbed.component';
import { AdminmedicalroomComponent } from './adminmedicalroom/adminmedicalroom.component';
import { AdminpreceduresComponent } from './adminprecedures/adminprecedures.component';
import { AdminreportComponent } from './adminreport/adminreport.component';
import { AdminstaffComponent } from './adminstaff/adminstaff.component';
import { AdminsyncComponent } from './adminsync/adminsync.component';
import { AdminpatientComponent } from './adminpatient/adminpatient.component';
import { DoctorpatientComponent } from './doctorpatient/doctorpatient.component';
import { DoctorrecordComponent } from './doctorrecord/doctorrecord.component';
import { PatientevaluationComponent } from './patientevaluation/patientevaluation.component';
import { PatientrecordComponent } from './patientrecord/patientrecord.component';
import { PatientregisterComponent } from './patientregister/patientregister.component';
import { PatientreservationComponent } from './patientreservation/patientreservation.component';

import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpClientModule } from "@angular/common/http";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http"
import { InMemoryCache } from "apollo-cache-inmemory";
import { LoginpatientComponent } from './loginpatient/loginpatient.component';
import { LogindoctorComponent } from './logindoctor/logindoctor.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { AdminequipmentComponent } from './adminequipment/adminequipment.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminbedComponent,
    AdminmedicalroomComponent,
    AdminpreceduresComponent,
    AdminreportComponent,
    AdminstaffComponent,
    AdminsyncComponent,
    AdminpatientComponent,
    DoctorpatientComponent,
    DoctorrecordComponent,
    PatientevaluationComponent,
    PatientrecordComponent,
    PatientregisterComponent,
    PatientreservationComponent,
    LoginpatientComponent,
    LogindoctorComponent,
    LoginadminComponent,
    AdminequipmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          /*
          Link graphql final deploy
          */
          uri: "http://52.42.115.183:9090/graphql",
        })
      }
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
