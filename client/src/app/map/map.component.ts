import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

import { LocationApi, Location } from '../shared/sdk';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  private map: L.Map;
  private markerIcon: L.Icon = L.icon({
    iconUrl: 'assets/img/dot.png',
    iconSize: [20, 20]
  });

  constructor(
    private locationApi: LocationApi,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.locationApi.find({include: ['medias']}).subscribe((locations: Location[]) => {
      this.map = L.map('map', {
        center: [48.195389, -2.932644],
        zoom: 9,
        maxBoundsViscosity: 1.0
      });

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'MAP',
      }).addTo(this.map);

      locations.forEach((location: Location) => this.addMarker(location));
    });
  }

  private addMarker(location: Location) {
    L.marker([parseFloat(location.lattitude), parseFloat(location.longitude)], {
      title: location.name,
      icon: this.markerIcon
    })
      .addTo(this.map)
      .on('click', e => {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '700px',
          data: location
        });

        dialogRef.afterClosed().subscribe(result => {});
    });
  }

}
