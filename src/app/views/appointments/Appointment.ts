import { Doctor } from '../doctors/Doctor';
import { Patient } from '../patients/Patient';
import { Timeslot } from '../doctor-details/Timeslot';

export type Appointment = {
  id: number;
  doctor: Doctor;
  patient: Patient;
  timeslot: Timeslot;
};
