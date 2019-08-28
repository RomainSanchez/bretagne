import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, UserApi, AccessToken, LoopBackAuth, SDKToken } from '../shared/sdk';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(
    private router: Router,
    private userApi: UserApi,
    private authService: LoopBackAuth
  ) { }

  ngOnInit() {

  }

  login() {
    this.userApi.login(this.user).subscribe((token: SDKToken) => {
      this.authService.setToken(token);
      this.router.navigate(['admin']);
    });
  }

}
