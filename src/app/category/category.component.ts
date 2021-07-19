import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  term: any;
  catname: string | null = sessionStorage.getItem("Category")
  constructor(private ds: DataService, public user: UserService) { }

  loginState = this.user.isLoggedIn();
  ngOnInit(): void {
    this.categoryProducts();
    this.getCart();
  }

  dt: any[] = [];

  categoryProducts() {
    let cat_id = atob(window.sessionStorage.getItem(btoa('cat_id')) || '{}')
    this.ds.sendApiRequest("products/" + cat_id, null).subscribe((data: { payload: any[]; }) => {
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
      for(var i = 0; i < this.cart_content.length; i++) {
        
        console.log(this.cart_content[i].product_id, id)
        if(this.cart_content[i].product_id == id) {
          Swal.fire({
            title: 'Oops!',
            text: 'Product is already in your cart.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: 'crimson'
          })
        } else {
          this.ds.sendApiRequest("addToCart/", this.cartContent).subscribe((data: { payload: any[]; }) => {
            Swal.fire({
              title: 'Success!',
              text: 'Product added to your cart.',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#228B22'
            })
          });
        }
        break;
      }
    }
  }

}
