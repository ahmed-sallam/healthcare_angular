import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../doctors/Doctor';
import { Appointment } from './Appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[] | any[]>('/api/appointments');
  }

  addAppointment(
    doctorId: number,
    patientId: number,
    timeslotId: number
  ): Observable<Appointment> {
    return this.http.post<Appointment | any>('/api/appointments', {
      doctorId,
      patientId,
      timeslotId,
    });
  }

  deleteAppointment(id: number): Observable<void | any> {
    return this.http.delete<void | any>(`/api/appointments/${id}`);
  }
}
