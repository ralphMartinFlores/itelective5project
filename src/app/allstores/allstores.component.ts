import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-allstores',
  templateUrl: './allstores.component.html',
  styleUrls: ['./allstores.component.css']
})
export class AllstoresComponent implements OnInit {

  search = new FormControl();

  constructor(private ds: DataService, public user: UserService, private router: Router) { }

  loginState = this.user.isLoggedIn();
  filter: any;
  
  ngOnInit(): void {
    this.getStores();
  }

  stores: any[] = [];
  getStores() {
    this.ds.sendApiRequest("stores/", null).subscribe((data: { payload: any[]; }) => {
      this.stores = data.payload;
    });
  }

  gotoStore(store: string) {
    window.sessionStorage.setItem(btoa('store_id'), btoa(store))
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
