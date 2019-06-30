import { Component, OnInit } from '@angular/core';
import { UserApi } from 'app/shared/sdk/index';
import { User } from '../shared/sdk';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: User = new User();

  constructor(private router: Router,
    private userApi: UserApi) { }

  ngOnInit() {

  }

  login() {
    
  }

}
