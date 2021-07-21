import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
      console.log('Please provide all the required values!')
      this.isSubmitted = false;
    }
    if (this.acc_password != this.acc_confirmpassword) {
      // this.errorToast("Passwords do not match.");
    }
    else {
      console.log(this.registrationForm.value)
      console.log(this.registrationForm.value)
      let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload')) || '{}'));
      this.ds.sendApiRequest("updatePassword/" + pload.id, this.registrationForm.value).subscribe((data: { payload: any[]; }) => {
        this.router.navigate(['/profile']);
        // this.successToast("Password Updated Successfully.");
      }, (err: any) => {
        // this.errorToast("Password was not updated.");
      });
    }
  }

}
