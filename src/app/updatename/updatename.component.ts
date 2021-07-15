import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-updatename',
  templateUrl: './updatename.component.html',
  styleUrls: ['./updatename.component.css']
})
export class UpdatenameComponent implements OnInit {

  constructor(public user: UserService) { }

  loginState = this.user.isLoggedIn();

  ngOnInit(): void {
  }

}
