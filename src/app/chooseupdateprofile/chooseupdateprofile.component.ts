import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chooseupdateprofile',
  templateUrl: './chooseupdateprofile.component.html',
  styleUrls: ['./chooseupdateprofile.component.css']
})
export class ChooseupdateprofileComponent implements OnInit {

  constructor(public user: UserService) { }
  loginState = this.user.isLoggedIn();

  ngOnInit(): void {
  }

}
