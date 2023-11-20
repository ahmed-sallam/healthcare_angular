import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecializationsComponent } from './views/specializations/specializations.component';
import { DoctorsComponent } from './views/doctors/doctors.component';
import { PatientsComponent } from './views/patients/patients.component';
import { AppointmentsComponent } from './views/appointments/appointments.component';
import { DoctorDetailsComponent } from './views/doctor-details/doctor-details.component';

const routes: Routes = [
  {
    path: 'specializations',
    component: SpecializationsComponent,
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
  },
  {
    path: 'doctors/:id',
    component: DoctorDetailsComponent,
  },
  {
    path: 'patients',
    component: PatientsComponent,
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
