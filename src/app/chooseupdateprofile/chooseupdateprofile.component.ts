import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chooseupdateprofile',
  templateUrl: './chooseupdateprofile.component.html',
  styleUrls: ['./chooseupdateprofile.component.css']
})
export class ChooseupdateprofileComponent implements OnInit {

  constructor(public user: UserService, private router: Router) { }
  loginState = this.user.isLoggedIn();

  ngOnInit(): void {
  }

  logout() {
    window.sessionStorage.clear();
    this.user.setLogout();
    this.router.navigate(['/']);
  }

}
