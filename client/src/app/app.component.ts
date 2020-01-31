import { LoopBackConfig } from './shared/sdk/lb.config';
import { Component } from '@angular/core';
import { LoopBackAuth } from './shared/sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(public authService: LoopBackAuth) {
    // Just note that this will need to be done to new components that you create if you want to give it access to our loopback app.
    LoopBackConfig.setBaseURL('http://127.0.0.1:8080');
    LoopBackConfig.setApiVersion('api');
  }
}
