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
  private layer1: L.FeatureGroup = new L.FeatureGroup();
  private layer2: L.FeatureGroup = new L.FeatureGroup();
  private layer3: L.FeatureGroup = new L.FeatureGroup();

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

      L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'MAP',
      }).addTo(this.map);

      this.addMarkers(locations);

      this.map.addLayer(this.layer1);

      this.map.on('zoomend', () => {
        const zoom = this.map.getZoom();

        if (zoom <= 9) {
          this.map.addLayer(this.layer1);
          this.map.removeLayer(this.layer2);
          this.map.removeLayer(this.layer3);
        }

        if (zoom > 9) {
          this.map.removeLayer(this.layer1);
          this.map.addLayer(this.layer2);
        }

        if (zoom > 12) {
          this.map.removeLayer(this.layer1);
          this.map.removeLayer(this.layer2);
          this.map.addLayer(this.layer3);
        }
      });
    });
  }

  private addMarkers(locations: Location[]) {
    locations.forEach((location: Location) => {
      const marker = L.marker([parseFloat(location.lattitude), parseFloat(location.longitude)], {
        title: location.name,
        icon: this.markerIcon
      })
      .on('click', e => {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '700px',
          data: location
        });

        dialogRef.afterClosed().subscribe(result => {});
      });

      switch (location.level) {
        case 1:
          this.layer1.addLayer(marker);

          break;
        case 2:
          this.layer2.addLayer(marker);

          break;
        default:
          this.layer3.addLayer(marker);
      }
    });
  }
}
