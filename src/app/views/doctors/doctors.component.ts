import { Component, OnInit } from '@angular/core';
import { Doctor } from './Doctor';
import { DoctorsService } from './doctors.service';
import { SpecializationsService } from '../specializations/specializations.service';
import { Specialization } from '../specializations/Specialization';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {
  constructor(
    private service: DoctorsService,
    private specializationService: SpecializationsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getDoctors();
    this.getSpecializations();
  }

  // todo: handle errors (loading errors)
  modalAction!: string;
  selectedItem: any | Doctor;
  doctorInput: string = '';
  isLoading: boolean = true;
  data!: Doctor[];
  specialization: Specialization[] = [];
  selectedSpecialization: Specialization | any = null;

  getDoctors() {
    this.service.getDoctors().subscribe(
      (data) => {
        this.data = data;
        this.isLoading = false;
      },
      (error) => {
        console.log('error ', error);
      }
    );
  }
  getSpecializations() {
    this.specializationService.getSpecializations().subscribe(
      (data) => {
        this.specialization = data;
        this.isLoading = false;
      },
      (error) => {
        console.log('error ', error);
      }
    );
  }

  addOrUpdateDoctor() {
    this.modalAction === 'add' ? this.addDoctor() : this.updateDoctor();
  }
  addDoctor() {
    if (
      this.selectedSpecialization === null ||
      this.doctorInput.trim().length < 1
    ) {
    } else {
      this.isLoading = true;
      this.service
        .addDoctor(this.doctorInput, this.selectedSpecialization)
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
  }

  resetFields() {
    this.doctorInput = '';
    this.modalAction = '';
    this.selectedItem = null;
    this.isLoading = false;
    this.selectedSpecialization = null;
  }

  updateDoctor() {
    this.isLoading = true;
    this.service
      .updateDoctor(
        this.selectedItem?.id,
        this.doctorInput,
        this.selectedItem?.specialization.id
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

  deleteDoctor() {
    this.isLoading = true;
    this.service.deleteDoctor(this.selectedItem.id).subscribe(
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
  navigateToDetails(item: Doctor) {
    this.router.navigate(['/doctors', item.id]);
  }

  setModalAction(action: string) {
    this.modalAction = action;
  }
  setSelectedItem(item: Doctor | any) {
    this.selectedItem = item;
    this.modalAction === 'add' ? '' : (this.doctorInput = item.name);
  }
}
