import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-fullproductinfo',
  templateUrl: './fullproductinfo.component.html',
  styleUrls: ['./fullproductinfo.component.css']
})
export class FullproductinfoComponent implements OnInit {

  constructor(public user: UserService) { }

  loginState = this.user.isLoggedIn();

  ngOnInit(): void {
  }

}
