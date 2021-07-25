import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-updatename',
  templateUrl: './updatename.component.html',
  styleUrls: ['./updatename.component.css']
})
export class UpdatenameComponent implements OnInit {

  constructor(public user: UserService, private formBuilder: FormBuilder, private ds: DataService, private router: Router) { }

  loginState = this.user.isLoggedIn();

  registrationForm!: FormGroup;
  isSubmitted = false;

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      acc_lname: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z \-\']+')]],
      acc_fname: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z \-\']+')]],
      acc_mname: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-Z \-\']+')]]
    })
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  acc_fname: any;
  acc_lname: any;
  acc_mname: any = '';
  acc_fullname: any = {};

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
          text: 'Name updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: 'forestgreen'
        })
      }, (err: any) => {
        Swal.fire({
          title: 'Oops!',
          text: 'Your name was not updated.',
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
