import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './Appointment';
import { Patient } from '../patients/Patient';
import { PatientsService } from '../patients/patients.service';
import { Doctor } from '../doctors/Doctor';
import { DoctorsService } from '../doctors/doctors.service';
import { DoctorDetailsService } from '../doctor-details/doctor-details.service';
import { Timeslot } from '../doctor-details/Timeslot';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  constructor(
    private service: AppointmentsService,
    private patientService: PatientsService,
    private doctorService: DoctorsService,
    private doctorDetailsService: DoctorDetailsService
  ) {}
  ngOnInit(): void {
    this.getAppointments();
    this.getPatients();
    this.getDoctors();
  }

  // todo: handle errors (loading errors)
  modalAction!: string;
  selectedItem: any | Appointment;
  doctorInput: string = '';
  isLoading: boolean = true;
  isTimeslotsLoading: boolean = true;
  showTimeslot: boolean = false;
  data: Appointment[] = [];
  selectedPatient: Patient | any = null;
  patients: Patient[] | any[] = [];
  selectedDoctor: Doctor | any = null;
  doctors: Doctor[] | any[] = [];
  selectedTimeslot: Timeslot | any;
  timeslots: Timeslot[] | any[] = [];
  getAppointments() {
    this.service.getAppointments().subscribe(
      (data) => {
        this.data = data;
        this.isLoading = false;
      },
      (error) => {
        console.log('error ', error);
      }
    );
  }
  getPatients() {
    this.patientService.getPatients().subscribe(
      (data) => {
        this.patients = data;
      },
      (error) => {
        console.log('error ', error);
      }
    );
  }
  getTimeslots(id: number) {
    this.showTimeslot = true;
    this.isTimeslotsLoading = true;

    console.log('dddd', this.selectedDoctor);
    this.timeslots = [];
    this.doctorDetailsService.getTimeslots(id).subscribe(
      (data) => {
        this.timeslots = data;
        this.isTimeslotsLoading = false;
      },
      (error) => {
        console.log('error ', error);
      }
    );
  }
  onselectDoctor() {
    this.getTimeslots(this.selectedDoctor);
  }
  getDoctors() {
    this.doctorService.getDoctors().subscribe(
      (data) => {
        this.doctors = data;
        this.isLoading = false;
      },
      (error) => {
        console.log('error ', error);
      }
    );
  }

  addOrUpdateDoctor() {
    this.modalAction === 'add'
      ? this.addAppointment()
      : this.updateAppointment();
  }

  addAppointment() {
    const ts = this.timeslots.filter(
      (timeslot) => timeslot.id == this.selectedTimeslot
    )[0];

    if (ts.isAvailable) {
      if (
        this.selectedPatient != null &&
        this.selectedDoctor != null &&
        this.selectedTimeslot != null
      ) {
        this.isLoading = true;
        this.service
          .addAppointment(
            this.selectedDoctor,
            this.selectedPatient,
            this.selectedTimeslot
          )
          .subscribe(
            (data) => {
              this.data.push(data);
              this.isLoading = false;
            },
            (error) => {
              console.log('error ', error);
            }
          );
        // reset
        this.resetFields();
      }
    } else {
      console.log('time is not available, select another timeslot ');
      // todo: handle
    }
  }
  resetFields() {
    this.doctorInput = '';
    this.modalAction = '';
    this.selectedItem = null;
    this.selectedPatient = null;
    this.selectedDoctor = null;
    this.selectedTimeslot = null;
    this.isLoading = false;
    this.isTimeslotsLoading = true;
    this.showTimeslot = false;
  }

  updateAppointment() {
    // this.isLoading = true;
    // this.service
    //   .updateDoctor(
    //     this.selectedItem?.id,
    //     this.doctorInput,
    //     this.selectedItem?.specialization.id
    //   )
    //   .subscribe(
    //     (data) => {
    //       console.log(data);
    //       this.data = this.data.map((item) => {
    //         if (item.id === data.id) {
    //           return data;
    //         }
    //         return item;
    //       });
    //       this.resetFields();
    //     },
    //     (error) => {
    //       console.log('error ', error);
    //     }
    //   );
  }

  deleteAppointment() {
    this.isLoading = true;
    this.service.deleteAppointment(this.selectedItem.id).subscribe(
      (data) => {
        this.data = this.data.filter(
          (item) => item.id !== this.selectedItem.id
        );
        this.resetFields();
      },
      (error) => {
        console.log('error ', error);
      }
    );
  }
  setModalAction(action: string) {
    this.modalAction = action;
  }
  setSelectedItem(item: Appointment | any) {
    this.selectedItem = item;
    // this.modalAction === 'add'
    //   ? ''
    //   : ((this.selectedDoctor = item.doctor),
    //     (this.selectedPatient = item.patient),
    //     (this.selectedTimeslot = item.timeslot));
  }
}
