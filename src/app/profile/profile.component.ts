import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public user: UserService, private ds: DataService, private router: Router) { }

  loginState = this.user.isLoggedIn();

  ngOnInit(): void {
    this.getUserProfile();
  }

  dt: any[] = [];
  getUserProfile() {
    let pload  = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload')) || '{}'));
    this.ds.sendApiRequest("accounts/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
    });
  }

  logout() {
    window.sessionStorage.clear();
    this.user.setLogout();
    this.router.navigate(['/']);
  }

}
