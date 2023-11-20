import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorDetailsService } from './doctor-details.service';
import { DoctorsService } from '../doctors/doctors.service';
import { Timeslot } from './Timeslot';
import { Doctor } from '../doctors/Doctor';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
})
export class DoctorDetailsComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private service: DoctorDetailsService,
    private doctorService: DoctorsService
  ) {}
  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      this.getDoctor(data['id']);
      this.getTimeslots(data['id']);
      console.log(data);
    });
  }

  isDoctorLoading = true;
  isTimeslotsLoading = true;
  isLoading: boolean = true;
  modalAction!: string;
  selectedItem: any | Timeslot;
  timeInput: string | any = '';
  data!: Timeslot[];
  doctor!: Doctor;

  getDoctor(id: number) {
    this.doctorService.getDoctor(id).subscribe(
      (data) => {
        this.doctor = data;
        this.isDoctorLoading = false;
      },
      (error) => {
        console.log('error ', error);
      }
    );
  }

  getTimeslots(id: number) {
    this.service.getTimeslots(id).subscribe(
      (data) => {
        this.data = data;
        this.isTimeslotsLoading = false;
      },
      (error) => {
        console.log('error ', error);
      }
    );
  }

  addOrUpdateDoctor() {
    this.modalAction === 'add' ? this.addTimeslot() : this.updateTimeslot();
  }
  addTimeslot() {
    if (this.timeInput === null || this.timeInput.trim().length < 1) {
    } else {
      this.isTimeslotsLoading = true;
      this.service.addTimeslot(this.timeInput, true, this.doctor.id).subscribe(
        (data) => {
          this.data.push(data);
          this.isTimeslotsLoading = false;
        },
        (error) => {
          console.log('error ', error);
        }
      );

      // reset
      this.resetFields();
    }
  }
  updateTimeslot() {
    this.isLoading = true;
    this.service
      .updateTimeslot(
        this.selectedItem?.id,
        this.timeInput,
        this.selectedItem.isAvailable,
        this.doctor.id
      )
      .subscribe(
        (data) => {
          console.log(data);

          this.data = this.data.map((item) => {
            if (item.id === data.id) {
              return data;
            }
            return item;
          });
          this.resetFields();
        },
        (error) => {
          console.log('error ', error);
        }
      );
  }

  resetFields() {
    this.timeInput = '';
    this.modalAction = '';
    this.selectedItem = null;
    this.isLoading = false;
    this.isTimeslotsLoading = false;
  }
  deleteTimeslot() {
    this.isLoading = true;
    if (this.selectedItem.isAvailable) {
      this.service.deleteTimeslot(this.selectedItem.id).subscribe(
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
  }

  setModalAction(action: string) {
    this.modalAction = action;
    console.log(this.selectedItem);
  }
  setSelectedItem(item: Timeslot | any) {
    this.selectedItem = item;
    this.modalAction === 'add' ? '' : (this.timeInput = item.dateTime);
  }
}
