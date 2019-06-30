import { Component, OnInit } from '@angular/core';

import { LocationApi } from '../shared/sdk';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  constructor(private locationApi: LocationApi) { }

  ngOnInit() {
    this.locationApi.find({
      include: ['medias']
    }).subscribe((locations: Location[]) => {
      console.log(locations);
    });
  }

}
