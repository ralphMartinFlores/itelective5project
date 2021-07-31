import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  isSubmitted = false;

  constructor(private ds: DataService, private router: Router, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      acc_lname: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z \-\']+')]],
      acc_fname: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z \-\']+')]],
      acc_gender: ['', [Validators.required]],
      acc_no: ['', [Validators.required]],
      acc_street: ['', [Validators.required]],
      acc_barangay: ['', [Validators.required]],
      acc_mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(11), Validators.minLength(11)]],
      acc_email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      acc_username: ['', [Validators.required, Validators.minLength(2)]],
      acc_password: ['', [Validators.required, Validators.minLength(8)]],
      termscbox: ['', [Validators.required]],
    })
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  acc_fname: any;
  acc_lname: any;
  acc_mname: any = '';
  acc_gender: any;
  acc_no: any;
  acc_street: any;
  acc_barangay: any = "Barangay";
  acc_city: any = 'Olongapo City';
  acc_province: any = 'Zambales';
  acc_email: any;
  acc_mobile: any;
  acc_username: any;
  acc_password: any;
  acc_info: any = {};

  register() {

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
      this.acc_info.acc_fname = this.acc_fname;
      this.acc_info.acc_lname = this.acc_lname;
      this.acc_info.acc_mname = this.acc_mname;
      this.acc_info.acc_gender = this.acc_gender;
      this.acc_info.acc_no = this.acc_no;
      this.acc_info.acc_street = this.acc_street;
      this.acc_info.acc_barangay = this.acc_barangay;
      this.acc_info.acc_city = this.acc_city;
      this.acc_info.acc_province = this.acc_province;
      this.acc_info.acc_email = this.acc_email;
      this.acc_info.acc_mobile = this.acc_mobile;
      this.acc_info.acc_username = this.acc_username;
      this.acc_info.acc_password = this.acc_password;

      this.ds.sendApiRequest("checkEmail/", this.acc_info).subscribe((data: { payload: any[]; }) => {
        this.ds.sendApiRequest("checkUsername/", this.acc_info).subscribe((data: { payload: any[]; }) => {
          this.ds.sendApiRequest("register/", this.acc_info).subscribe((data: { payload: any[]; }) => {
            Swal.fire({
              title: 'Success!',
              text: "Please check your email to see the OTP code we've sent you.",
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: 'forestgreen'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/']);
              }
            })
          }, (err: any) => {
      
          });
        }, (err: any) => {
          Swal.fire({
            title: 'Oops!',
            text: 'Desired username already exists.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: 'crimson'
          })
        });
      }, (err: any) => {
        Swal.fire({
          title: 'Oops!',
          text: 'Email Address already exists.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: 'crimson'
        })
      });
    }

  }
}
