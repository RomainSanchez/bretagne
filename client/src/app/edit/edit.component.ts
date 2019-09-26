import { Component, OnInit } from '@angular/core';
import { LocationApi, Location } from '../shared/sdk';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  location: Location;

  constructor(
    private route: ActivatedRoute,
    private locationApi: LocationApi
  ) { }

  ngOnInit() {
    // console.log(this.route);
    // const locationId = this.route.params._value.id;
    // console.log(locationId)

    // this.locationApi.findOne({id: locationId}).subscribe((location: Location) => {
    //   this.location = location;
    // });
  }

}
