import { Component, OnInit } from '@angular/core';
import { Location, LocationApi } from '../shared/sdk';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  location: Location;

  constructor(private locationApi: LocationApi) { }

  ngOnInit() {
    this.location = new Location();
  }

  submit() {
    console.log(this.location);
    this.locationApi.create(this.location).subscribe(() => {

    });
  }

}
