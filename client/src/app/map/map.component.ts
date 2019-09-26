import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

import { LocationApi } from '../shared/sdk';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  constructor(private locationApi: LocationApi) { }

  async ngOnInit() {
    this.locationApi.find({include: ['medias']}).subscribe((locations: Location[]) => {
      const map = L.map('map', {
        center: [48.195389, -2.932644],
        zoom: 8,
        maxBoundsViscosity: 1.0
      });

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'MAP',
      }).addTo(map);

      

      const marker = L.marker([47.997542, -4.097899], { title: 'Quimper' })
        // .on('click',
        //   (data) => {
        //   console.log(data);
        // })
        .addTo(map)
      ;
      const video = '<video width="320" height="240" controls><source src="https://www.youtube.com/watch?v=L1lnNVXwfAw" type="video/mp4">Your browser does not support the video tag. </video>';
      const iframe ='<iframe width="560" height="315" src="https://www.youtube.com/embed/L1lnNVXwfAw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      marker.bindPopup(iframe, { offset: new L.Point(-1, -41) });
    });
  }

}
