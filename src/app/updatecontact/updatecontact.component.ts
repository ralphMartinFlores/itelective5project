import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-updatecontact',
  templateUrl: './updatecontact.component.html',
  styleUrls: ['./updatecontact.component.css']
})
export class UpdatecontactComponent implements OnInit {

  registrationForm!: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private ds: DataService, private router: Router, private user: UserService) { }

  loginState = this.user.isLoggedIn();

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      acc_mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(11), Validators.minLength(11)]]
    })
  }

  get errorControl() {
    return this.registrationForm.controls;
  }

  acc_mobile: any;
  acc_contact: any = {};

  submitForm() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      console.log('Please provide all the required values!')
      this.isSubmitted = false;
    } else {
      console.log(this.registrationForm.value)
      let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload')) || '{}'));
      this.ds.sendApiRequest("updateProfile/" + pload.id, this.registrationForm.value).subscribe((data: { payload: any[]; }) => {
        this.router.navigate(['/profile']);
        Swal.fire({
          title: 'Success!',
          text: 'Contact updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: 'forestgreen'
        })
      }, (err: any) => {
  
      });
    }
  }

  logout() {
    window.sessionStorage.clear();
    this.user.setLogout();
    this.router.navigate(['/']);
  }

}
