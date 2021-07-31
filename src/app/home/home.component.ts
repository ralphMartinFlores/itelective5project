import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
    this.featuredProduct();
    this.getCart();
  }

  dt: any[] = [];
  getUserProfile() {
    let pload  = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload')) || '{}'));
    this.ds.sendApiRequest("accounts/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
    });
  }

  productdata: any[] = [];
  randomitem: any;
  featuredProduct() {
    this.ds.sendApiRequest("products/", null).subscribe((data: { payload: any[]; }) => {
      this.productdata = data.payload;
      this.randomitem = this.productdata[Math.floor(Math.random() * this.productdata.length)];
      console.log(this.randomitem)
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

  cart_content: any = {};
  cartContent: any = {};
  
  getCart() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload')) || '{}'));
    this.ds.sendApiRequest("cart/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.cart_content = data.payload;
    }, (er: any) => {
    
    });
  }

  addToCart(id: any) {

    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload')) || '{}'));
    this.cartContent.acc_id = pload.id;
    this.cartContent.product_id = id;
    
    console.log(this.cart_content.length)
    this.getCart();
    if(this.cart_content.length == 0){
      this.ds.sendApiRequest("addToCart/", this.cartContent).subscribe((data: { payload: any[]; }) => {
        this.getCart();
        Swal.fire({
          title: 'Success!',
          text: 'Product added to your cart.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#228B22'
        })
      });
      console.log(this.cart_content.length)
    }else{
      if (this.cart_content.some((t: { product_id: any; })=>t.product_id == id) == true) {
        this.getCart();
        Swal.fire({
          title: 'Oops!',
          text: 'Product is already in your cart.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: 'crimson'
        })
      } else {
        this.ds.sendApiRequest("addToCart/", this.cartContent).subscribe((data: { payload: any[]; }) => {
          this.getCart();
          Swal.fire({
            title: 'Success!',
            text: 'Product added to your cart.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#228B22'
          })
        });
      }
    }
  }

  logout() {
    window.sessionStorage.clear();
    this.user.setLogout();
    this.router.navigate(['/']);
  }

}
