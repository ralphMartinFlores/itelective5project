import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-updateaddress',
  templateUrl: './updateaddress.component.html',
  styleUrls: ['./updateaddress.component.css']
})
export class UpdateaddressComponent implements OnInit {

  constructor(public user: UserService) { }

  loginState = this.user.isLoggedIn();

  ngOnInit(): void {
  }

}
