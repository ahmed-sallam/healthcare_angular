import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from './Patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[] | any[]>('/api/patients');
  }

  addPatient(name: string, contactNumber: string): Observable<Patient> {
    return this.http.post<Patient | any>('/api/patients', {
      name,
      contactNumber,
    });
  }

  updatePatient(
    id: number,
    name: string,
    contactNumber: string
  ): Observable<Patient> {
    return this.http.put<Patient | any>(`/api/patients/${id}`, {
      name,
      contactNumber,
    });
  }

  deletePatient(id: number): Observable<void | any> {
    return this.http.delete<void | any>(`/api/patients/${id}`);
  }
}
