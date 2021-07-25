import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-updateaddress',
  templateUrl: './updateaddress.component.html',
  styleUrls: ['./updateaddress.component.css']
})
export class UpdateaddressComponent implements OnInit {

  registrationForm!: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private ds: DataService, private router: Router, private user: UserService) { }

  loginState = this.user.isLoggedIn();

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      acc_no: ['', [Validators.required]],
      acc_street: ['', [Validators.required]],
      acc_barangay: ['', [Validators.required]],
      acc_city: [''],
      acc_province: ['']
    })
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  acc_no: any;
  acc_street: any;
  acc_barangay: any = 'Barangay';
  acc_city: any = 'Olongapo City';
  acc_province: any = 'Zambales';

  submitForm() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      Swal.fire({
        title: 'Oops!',
        text: 'Please provide all the required details.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'crimson'
      })
      return false;
    } else {
      console.log(this.registrationForm.value)
      let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload')) || '{}'));
      this.ds.sendApiRequest("updateProfile/" + pload.id, this.registrationForm.value).subscribe((data: { payload: any[]; }) => {
        this.router.navigate(['/profile']);
        Swal.fire({
          title: 'Success!',
          text: 'Address updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: 'forestgreen'
        })
      }, (err: any) => {
        Swal.fire({
          title: 'Oops!',
          text: 'Your address was not updated.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: 'crimson'
        })
      });
    }
  }

  logout() {
    window.sessionStorage.clear();
    this.user.setLogout();
    this.router.navigate(['/']);
  }

}
