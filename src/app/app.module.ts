import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavebarComponent } from './components/navebar/navebar.component';
import { SpecializationsComponent } from './views/specializations/specializations.component';
import { DoctorsComponent } from './views/doctors/doctors.component';
import { PatientsComponent } from './views/patients/patients.component';
import { AppointmentsComponent } from './views/appointments/appointments.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DoctorDetailsComponent } from './views/doctor-details/doctor-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavebarComponent,
    SpecializationsComponent,
    DoctorsComponent,
    PatientsComponent,
    AppointmentsComponent,
    DoctorDetailsComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
