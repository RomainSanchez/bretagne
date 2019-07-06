import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, UserApi } from '../shared/sdk';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(
    private router: Router,
    private userApi: UserApi
  ) { }

  ngOnInit() {

  }

  login() {

  }

}
