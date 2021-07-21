import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ds: DataService, private user: UserService, private router: Router) { }

  ngOnInit(): void {
  }


  dt: any = {};

  acc_password: any;
  acc_username: any;
  acc_info: any = {};

  login() {
    
    this.acc_info.acc_password = this.acc_password;
    this.acc_info.acc_username = this.acc_username;

    if(this.acc_info.acc_password == null || this.acc_info.acc_username ==null){
      return;
    }

    this.ds.sendApiRequest("login/", this.acc_info).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      window.sessionStorage.setItem(btoa('payload'), this.dt);
      this.user.setLogin();
      
      let pload = JSON.parse(atob(this.dt));

      Swal.fire({
        title: 'Success!',
        text: 'Welcome' + " " + pload.fname + " " + pload.lname + "!",
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#228B22'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/home']);
        }
      })
    }, (er: any) => {
      Swal.fire({
        title: 'Oops!',
        text: 'You may have entered an invalid username or password.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'crimson'
      })
    });
  }

}
