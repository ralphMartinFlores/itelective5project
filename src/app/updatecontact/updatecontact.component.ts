import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-updatecontact',
  templateUrl: './updatecontact.component.html',
  styleUrls: ['./updatecontact.component.css']
})
export class UpdatecontactComponent implements OnInit {

  constructor(public user: UserService) { }

  loginState = this.user.isLoggedIn();

  ngOnInit(): void {
  }

}
