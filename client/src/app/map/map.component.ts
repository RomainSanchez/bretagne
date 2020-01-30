import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

import { LocationApi, Location } from '../shared/sdk';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  constructor(
    private locationApi: LocationApi,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.locationApi.find({include: ['medias']}).subscribe((locations: Location[]) => {
      locations = locations.filter(location => location.medias.length > 0);

      const map = L.map('map', {
        center: [48.195389, -2.932644],
        zoom: 9,
        maxBoundsViscosity: 1.0
      });

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'MAP',
      }).addTo(map);

      const marker = L.marker([47.997542, -4.097899], { title: 'Quimper' })
        .addTo(map)
        .on('click', e => {
          const event = e as L.LeafletMouseEvent;

          const location = locations.find((l: Location) => {
            return l.lattitude === event.latlng.lat + '' && l.longitude === event.latlng.lng + '';
          });
console.log(location);
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '700px',
            data: location
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
      });
    });
  }

}
