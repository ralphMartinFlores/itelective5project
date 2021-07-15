import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  constructor(private ds:DataService, private router: Router, route:ActivatedRoute, public user: UserService) {route.params.subscribe(val => {
    this.getCart();
  });}

  loginState = this.user.isLoggedIn();
  
  ngOnInit() {
    this.getUserProfile();
    this.getCart();
    
  }

  dt: any[] = [];

  getUserProfile() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload')) || '{}'));
    this.ds.sendApiRequest("accounts/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      console.log(this.dt)
    });
  }

  
  toClearCart: any = {};

  clearCart() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload')) || '{}'));
    this.toClearCart.cart_status = 0;
    this.ds.sendApiRequest("clearCart/" + pload.id, this.toClearCart).subscribe((data: { payload: any[]; }) => {
    });
  }

  cart: any = [];
  cart_qty: any = "";

  getCart() {
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload')) || '{}'));
    this.ds.sendApiRequest("cart/" + pload.id, null).subscribe((data: { payload: any[]; }) => {
      this.cart = data.payload;
      console.log(this.cart)
      if(this.cart != ''){
        this.getTotal()
      }else{
        // this.presentToast("Your cart doesn't have any product/s yet");
      }
    }, (er: any) => {
        // this.presentToast("Your cart doesn't have products yet");
      });
  
  }

  // async presentToast(messageError) {
  //   const toast = await this.toastCtrl.create({
  //       duration: 1200,
  //       color: 'dark',
  //       message: messageError,
  //       position: 'bottom',
  //       cssClass: 'my-custom-class'
  //     });
  //   toast.present();
  // }

  // back(){
  //   this.router.navigate(['/cart']);
    
  // }

  order_info: any = {};
  prod_id: any = [];
  item_quantity: any = [];
  order_total_product: any = [];
  order_total: any;
  
  getTotal(){
    this.order_info = {};
    this.prod_id = [];
    this.item_quantity = [];
    this.order_total_product = [];
    
    let pload = JSON.parse(atob(window.sessionStorage.getItem(btoa('payload')) || '{}'));
    if(this.cart != ''){
      console.log(this.cart);
      for(var i = 0; i < this.cart.length; i++) {
        this.item_quantity.push(this.cart[i].cart_quantity);
        this.prod_id.push(this.cart[i].product_id);
        this.order_total_product.push(this.cart[i].cart_quantity * this.cart[i].product_price);
      }

      this.order_total_product = this.order_total_product.reduce((acc: number, cur: any) => acc + Number(cur), 0)

      this.order_info.item_quantity = this.item_quantity;
      this.order_info.product_id = this.prod_id;
      this.order_info.order_shipping = 100;
      this.order_info.order_total = this.order_total_product;
      this.order_info.order_grandtotal = 100 + Number(this.order_total_product);
      this.order_info.acc_id = pload.id;

      console.log(this.order_info)
      console.log(this.cart)
      
    }else{
      // this.presentToast("Your cart doesn't have any product/s yet");
    }
  }

  checkOut(){
    this.ds.sendApiRequest("placeOrder/", this.order_info).subscribe((data: { payload: any[]; }) => {

      this.cart = data.payload;
      console.log(this.cart);
      this.clearCart();
      // this.presentToast("Purchased");
      Swal.fire({
        title: 'Order Placed!',
        text: 'Your order has now been received. Please check the status of your order at the your orders page.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#228B22'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/myorders']);
        }
      })
    });
  }

}
