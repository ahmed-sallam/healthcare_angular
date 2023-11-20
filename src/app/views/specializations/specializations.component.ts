import { Component, OnInit } from '@angular/core';
import { SpecializationsService } from './specializations.service';
import { Specialization } from './Specialization';

@Component({
  selector: 'app-specializations',
  templateUrl: './specializations.component.html',
  styleUrls: ['./specializations.component.css'],
})
export class SpecializationsComponent implements OnInit {
  constructor(private service: SpecializationsService) {}
  ngOnInit(): void {
    this.getSpecializations();
  }

  // todo: handle errors (loading errors)
  modalAction!: string;
  selectedItem: any | Specialization;
  specialzationInput: string = '';
  isLoading: boolean = true;
  data!: Specialization[];
  getSpecializations() {
    this.service.getSpecializations().subscribe(
      (data) => {
        this.data = data;
        this.isLoading = false;
      },
      (error) => {
        console.log('error ', error);
      }
    );
  }

  addOrUpdateSpecialzation() {
    this.modalAction === 'add'
      ? this.addSpecialzation()
      : this.updateSpecialzation();
  }

  addSpecialzation() {
    this.isLoading = true;
    this.service.addSpecialization(this.specialzationInput).subscribe(
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

  resetFields() {
    this.specialzationInput = '';
    this.modalAction = '';
    this.selectedItem = null;
    this.isLoading = false;
  }

  deleteSpecialzation() {
    this.isLoading = true;
    this.service.deleteSpecialization(this.selectedItem.id).subscribe(
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

  updateSpecialzation() {
    this.isLoading = true;
    this.service
      .updateSpecialization({
        id: this.selectedItem.id,
        name: this.specialzationInput,
      })
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

  setModalAction(action: string) {
    this.modalAction = action;
    console.log(this.selectedItem);
  }
  setSelectedItem(item: Specialization | any) {
    this.selectedItem = item;
    this.modalAction === 'add' ? '' : (this.specialzationInput = item.name);
  }
}
