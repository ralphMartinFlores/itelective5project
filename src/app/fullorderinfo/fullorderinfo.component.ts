import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-fullorderinfo',
  templateUrl: './fullorderinfo.component.html',
  styleUrls: ['./fullorderinfo.component.css']
})
export class FullorderinfoComponent implements OnInit {

  constructor(private ds: DataService, private router: Router, public user: UserService) { }
  loginState = this.user.isLoggedIn();

  order_info: any = JSON.parse(atob(window.sessionStorage.getItem(btoa('order_info')) || '{}'))
  ngOnInit() {
    this.getOrder();
    this.getOrderItems();
    this.getOrderDetails();
  }

  dt: any[] = [];
  
  getOrder(){
    this.dt.push(this.order_info);
    console.log(this.dt[0]);
  }

  order_item: any[] = [];
  getOrderItems() {
    this.ds.sendApiRequest("order_items/" + this.dt[0].order_id, null).subscribe((data: { payload: any[]; }) => {
      this.order_item = data.payload;
      console.log('Order Item:', this.order_item)
    });
  }

  order_details: any[] = [];
  getOrderDetails() {
    this.ds.sendApiRequest("order_details/" + this.dt[0].order_id, null).subscribe((data: { payload: any[]; }) => {
      this.order_details = data.payload;
      console.log(this.order_details[0].acc_no)
    });
  }

  orderStatus: any = {};
  cancelOrder() {
    this.orderStatus.order_status = 0;
    this.ds.sendApiRequest("cancelOrder/" + this.dt[0].order_id, this.orderStatus).subscribe((data: { payload: any[]; }) => {
      Swal.fire({
        title: 'Success!',
        text: 'Your order was cancelled.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: 'forestgreen'
      }).then((result) => {
        if (result.isConfirmed) {
          this.order_item = data.payload;
          this.router.navigate(['/orders']);
        }
      })
    });
  }

}
