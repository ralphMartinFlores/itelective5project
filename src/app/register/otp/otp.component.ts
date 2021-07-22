import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {

  constructor(private router: Router, private ds: DataService) { }

  ngAfterViewInit(): void {
    this.getUserOtp();
  }

  acc_otp: any;
  acc_email: any;
  acc_otp_info: any = {};

  dt: any = {};

  getUserOtp() {
    this.acc_otp_info.acc_email = window.sessionStorage.getItem('email');
    this.ds.sendApiRequest("getOTP/", this.acc_otp_info).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
      this.sendUserOTP();
    }, (err: any) => {

    });
  }

  sendUserOTP() {
    this.acc_otp_info.acc_email = window.sessionStorage.getItem('email');
    this.acc_otp_info.acc_otp = this.dt[0].acc_otp;
    this.ds.sendApiRequest("sendOTP/", this.acc_otp_info).subscribe((data: { payload: any[]; }) => {
    }, (err: any) => {
    });
  }

  nextForm() {
    if(this.dt[0].acc_otp == this.acc_otp) {
      this.router.navigate(['/']);
      Swal.fire({
        title: 'Success!',
        text: 'Your registration is now complete.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: 'forestgreen'
      })
    } else {
      Swal.fire({
        title: 'Oops!',
        text: 'OTP code is incorrect.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'crimson'
      })
    }
  }

}
