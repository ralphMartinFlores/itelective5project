import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {

  registrationForm!: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private ds: DataService, private router: Router, private user: UserService) { }

  loginState = this.user.isLoggedIn();

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      acc_password: ['', [Validators.required, Validators.minLength(8)]],
      acc_confirmpassword: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  acc_password: any;
  acc_confirmpassword: any;
  acc_credentails: any = {};


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
    }
    if (this.acc_password != this.acc_confirmpassword) {
      Swal.fire({
        title: 'Oops!',
        text: 'Make sure your passwords match.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'crimson'
      })
    }
    else {
      console.log(this.registrationForm.value)
      console.log(this.registrationForm.value)
      let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload')) || '{}'));
      this.ds.sendApiRequest("updatePassword/" + pload.id, this.registrationForm.value).subscribe((data: { payload: any[]; }) => {
        this.router.navigate(['/profile']);
        Swal.fire({
          title: 'Success!',
          text: 'Password updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: 'forestgreen'
        })
      }, (err: any) => {
        Swal.fire({
          title: 'Oops!',
          text: 'Your password cannot be changed.',
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
