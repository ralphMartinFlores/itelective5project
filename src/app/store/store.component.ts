import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  page = 1;

  constructor(public user: UserService, private ds: DataService, private router: Router) { }

  loginState = this.user.isLoggedIn();

  storename: string | null = sessionStorage.getItem("Store Name")

  term: any;

  ngOnInit(): void {
    this.storeProducts();
    this.getCart();
  }

  onTableDataChange(event){
    this.page = event;
    this.storeProducts();
  } 

  dt: any[] = [];

  storeProducts() {
    let store_id = atob(window.sessionStorage.getItem(btoa('store_id')) || '{}')
    this.ds.sendApiRequest("storeProducts/" + store_id, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
    });
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

  viewProduct(product_id: any) {
    window.sessionStorage.setItem(btoa('product_id'), btoa(product_id))
    this.router.navigate(['/fullproductinfo']);
  }

  logout() {
    window.sessionStorage.clear();
    this.user.setLogout();
    this.router.navigate(['/']);
  }
}
