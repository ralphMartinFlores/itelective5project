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
    this.getUserProfile();
    this.getStores();
  }

  dt: any[] = [];
  getUserProfile() {
    let pload  = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload')) || '{}'));
    this.ds.sendApiRequest("accounts/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
    });
  }

  stores: any[] = [];
  getStores() {
    this.ds.sendApiRequest("stores/", null).subscribe((data: { payload: any[]; }) => {
      this.stores = data.payload;
      console.log(this.stores)
    });
  }

  category(cat: string) {
    window.sessionStorage.setItem(btoa('cat_id'), btoa(cat))
    window.sessionStorage.setItem('Category', cat)
    this.router.navigate(['/category']);
  }

  gotoStore(store: string) {
    console.log(store)
    window.sessionStorage.setItem(btoa('store_id'), btoa(store))
    window.sessionStorage.setItem('Store Name', store)
    this.router.navigate(['/store']);
  }

  getStoreName(store: string) {
    console.log(store)
    window.sessionStorage.setItem('Store Name', store)
  }

  logout() {
    window.sessionStorage.clear();
    this.user.setLogout();
    this.router.navigate(['/']);
  }

}
