import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialization } from './Specialization';

@Injectable({
  providedIn: 'root',
})
export class SpecializationsService {
  constructor(private http: HttpClient) {}

  getSpecializations(): Observable<Specialization[]> {
    return this.http.get<Specialization[] | any[]>(
      '/api/doctors/specializations'
    );
  }

  addSpecialization(name: string): Observable<Specialization> {
    return this.http.post<Specialization | any>(
      '/api/doctors/specializations',
      { name }
    );
  }

  updateSpecialization(
    specialization: Specialization
  ): Observable<Specialization> {
    return this.http.put<Specialization | any>(
      `/api/doctors/specializations/${specialization.id}`,
      {
        name: specialization.name,
      }
    );
  }

  deleteSpecialization(id: number): Observable<void | any> {
    return this.http.delete<void | any>(`/api/doctors/specializations/${id}`);
  }
}
