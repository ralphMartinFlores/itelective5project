import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  search = new FormControl();

  page = 1;
  term: any;
  catname: string | null = sessionStorage.getItem("Category")
  constructor(private ds: DataService, public user: UserService, private router: Router) { }

  loginState = this.user.isLoggedIn();
  ngOnInit(): void {
    this.categoryProducts();
    this.getCart();
  }

  onTableDataChange(event){
    this.page = event;
    this.categoryProducts();
  }  

  dt: any[] = [];

  categoryProducts() {
    let cat_id = atob(window.sessionStorage.getItem(btoa('cat_id')) || '{}')
    this.ds.sendApiRequest("products/" + cat_id, null).subscribe((data: { payload: any[]; }) => {
      this.dt = data.payload;
      var randomitem = this.dt[Math.floor(Math.random() * this.dt.length)];
      console.log(this.dt)
      console.log(randomitem)
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
