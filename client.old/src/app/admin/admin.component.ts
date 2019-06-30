import { Component, OnInit } from '@angular/core';

import { LocationApi } from '../shared/sdk';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(locationApi: LocationApi) { }

  ngOnInit() {
    this.locationApi.find().subscribe((locations: Location[]) => {
      console.log(locations);
    });
  }

}
