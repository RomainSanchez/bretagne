import { Component, OnInit } from '@angular/core';
import { User, UserApi } from '../shared/sdk';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  user: User;

  constructor(private userApi: UserApi) { }

  ngOnInit() {
    this.user = new User();
  }

  submit() {
    this.isLoading = true;

    this.user.realm = 'admin';

    this.userApi.create(this.user).subscribe((user: User) => {
      this.isLoading = false;
    });
  }

}
