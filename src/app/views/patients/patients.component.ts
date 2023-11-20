import { Component, OnInit } from '@angular/core';
import { PatientsService } from './patients.service';
import { Patient } from './Patient';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  constructor(private service: PatientsService) {}
  ngOnInit(): void {
    this.getPatients();
  }
  // todo: handle errors (loading errors)
  modalAction!: string;
  selectedItem: any | Patient;
  patientInput: string = '';
  contactNumberInput: string = '';
  isLoading: boolean = true;
  data!: Patient[];

  getPatients() {
    this.service.getPatients().subscribe(
      (data) => {
        this.data = data;
        this.isLoading = false;
      },
      (error) => {
        console.log('error ', error);
      }
    );
  }

  addOrUpdateDoctor() {
    this.modalAction === 'add' ? this.addPatient() : this.updatePatient();
  }

  addPatient() {
    if (
      this.contactNumberInput.trim().length < 1 ||
      this.patientInput.trim().length < 1
    ) {
    } else {
      this.isLoading = true;
      this.service
        .addPatient(this.patientInput, this.contactNumberInput)
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
    this.patientInput = '';
    this.contactNumberInput = '';
    this.modalAction = '';
    this.selectedItem = null;
    this.isLoading = false;
  }

  updatePatient() {
    this.isLoading = true;
    this.service
      .updatePatient(
        this.selectedItem?.id,
        this.patientInput,
        this.contactNumberInput
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

  deletePatient() {
    this.isLoading = true;
    this.service.deletePatient(this.selectedItem.id).subscribe(
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
  setSelectedItem(item: Patient | any) {
    this.selectedItem = item;
    this.modalAction === 'add'
      ? ''
      : ((this.patientInput = item.name),
        (this.contactNumberInput = item.contactNumber));
  }
}
