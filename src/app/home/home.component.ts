import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private ds: DataService, private router: Router, public user: UserService) { }

  loginState = this.user.isLoggedIn();

  ngOnInit(): void {
    console.log(this.loginState)
  }

  category(cat: string) {
    window.sessionStorage.setItem(btoa('cat_id'), btoa(cat))
    this.router.navigate(['/category']);
  }

}
