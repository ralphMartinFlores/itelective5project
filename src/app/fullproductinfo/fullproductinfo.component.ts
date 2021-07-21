import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fullproductinfo',
  templateUrl: './fullproductinfo.component.html',
  styleUrls: ['./fullproductinfo.component.css']
})
export class FullproductinfoComponent implements OnInit {

  constructor(public user: UserService, private ds: DataService) { }

  loginState = this.user.isLoggedIn();

  ngOnInit(): void {
    this.getProduct();
    this.getCart();
  }

  dt: any[] = [];

  getProduct() {
    let product_id = atob(window.sessionStorage.getItem(btoa('product_id')) || '{}')
    this.ds.sendApiRequest("productDesc/" + product_id, null).subscribe((data: { payload: any[]; }) => {
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

}
