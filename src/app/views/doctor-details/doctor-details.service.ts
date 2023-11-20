import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Timeslot } from './Timeslot';

@Injectable({
  providedIn: 'root',
})
export class DoctorDetailsService {
  constructor(private http: HttpClient) {}
  getTimeslots(id: number): Observable<Timeslot[]> {
    return this.http.get<Timeslot[] | any[]>(`/api/timeslots/by-doctor/${id}`);
  }

  addTimeslot(
    dateTime: Date,
    isAvailable: boolean,
    doctorId: number
  ): Observable<Timeslot> {
    return this.http.post<Timeslot | any>('/api/timeslots', {
      dateTime,
      isAvailable,
      doctorId,
    });
  }

  updateTimeslot(
    id: number,
    dateTime: Date,
    isAvailable: boolean,
    doctorId: number
  ): Observable<Timeslot> {
    return this.http.put<Timeslot | any>(`/api/timeslots/${id}`, {
      dateTime,
      isAvailable,
      doctorId,
    });
  }

  deleteTimeslot(id: number): Observable<void | any> {
    return this.http.delete<void | any>(`/api/timeslots/${id}`);
  }
}
