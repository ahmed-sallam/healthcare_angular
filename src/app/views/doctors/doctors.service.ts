import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specialization } from '../specializations/Specialization';
import { Observable } from 'rxjs';
import { Doctor } from './Doctor';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[] | any[]>('/api/doctors');
  }
  getDoctor(id: number): Observable<Doctor> {
    return this.http.get<Doctor | any>(`/api/doctors/${id}`);
  }
  addDoctor(name: string, specializationId: number): Observable<Doctor> {
    return this.http.post<Doctor | any>('/api/doctors', {
      name,
      specializationId,
    });
  }

  updateDoctor(
    id: number,
    name: string,
    specializationId: number
  ): Observable<Doctor> {
    return this.http.put<Doctor | any>(`/api/doctors/${id}`, {
      name,
      specializationId,
    });
  }

  deleteDoctor(id: number): Observable<void | any> {
    return this.http.delete<void | any>(`/api/doctors/${id}`);
  }
}
