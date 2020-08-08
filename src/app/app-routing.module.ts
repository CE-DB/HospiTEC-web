import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientregisterComponent } from './patientregister/patientregister.component';
import { PatientreservationComponent } from './patientreservation/patientreservation.component';
import { PatientrecordComponent } from './patientrecord/patientrecord.component';
import { PatientevaluationComponent } from './patientevaluation/patientevaluation.component';
import { DoctorpatientComponent } from './doctorpatient/doctorpatient.component';
import { DoctorrecordComponent } from './doctorrecord/doctorrecord.component';
import { AdminstaffComponent } from './adminstaff/adminstaff.component';
import { AdminpreceduresComponent } from './adminprecedures/adminprecedures.component';
import { AdminmedicalroomComponent } from './adminmedicalroom/adminmedicalroom.component';
import { AdminbedComponent } from './adminbed/adminbed.component';
import { AdminreportComponent } from './adminreport/adminreport.component';
import { AdminsyncComponent } from './adminsync/adminsync.component';
import { LoginpatientComponent } from './loginpatient/loginpatient.component';
import { LogindoctorComponent } from './logindoctor/logindoctor.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { AdminequipmentComponent } from './adminequipment/adminequipment.component';


const routes: Routes = [
  {path: "", redirectTo: "patient", pathMatch:"full"},
  {path: "patient", children: [
    {path: "", redirectTo: "register", pathMatch: "full"},
    {path: "register", component: PatientregisterComponent},
    {path: "reservation", component: PatientreservationComponent},
    {path: "record", component: PatientrecordComponent},
    {path: "evaluation", component: PatientevaluationComponent}
  ]},
  {path: "doctor", children: [
    {path: "", redirectTo: "patient", pathMatch: "full"},
    {path: "patient", component: DoctorpatientComponent},
    {path: "record", component: DoctorrecordComponent}
  ]},
  {path: "admin", children: [
    {path: "", redirectTo: "staff", pathMatch: "full"},
    {path: "staff", component: AdminstaffComponent},
    {path: "procedure", component: AdminpreceduresComponent},
    {path: "medicalroom", component: AdminmedicalroomComponent},
    {path: "bed", component: AdminbedComponent},
    {path: "equipment", component: AdminequipmentComponent},
    {path: "sync", component: AdminsyncComponent}
  ]},
  {path:"patientlogin", component: LoginpatientComponent},
  {path: "doctorlogin", component: LogindoctorComponent},
  {path: "adminlogin", component: LoginadminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
