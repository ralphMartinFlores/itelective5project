import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private ds: DataService) { }

  ngOnInit(): void {
  }

  acc_fname: any;
  acc_lname: any;
  acc_mname: any = '';
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
    this.acc_info.acc_fname = this.acc_fname;
    this.acc_info.acc_lname = this.acc_lname;
    this.acc_info.acc_mname = this.acc_mname;
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
          console.log('success')
          // this.router.navigate(['/register/otp']);
        }, (err: any) => {
    
        });
      }, (err: any) => {
        // this.presentToast('Username already exists','');
      });
    }, (err: any) => {
      // this.presentToast('Email address already exists','');
    });
  }
}
