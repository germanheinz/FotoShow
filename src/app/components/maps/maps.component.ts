import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Post } from '../../interfaces/interface';

declare var mapboxgl: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('maps',  {static: true}) map;

  constructor() { }


  ngOnInit() {
    console.log('ver%%%%%%', this.coords);
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VybWFuaHoiLCJhIjoiY2s5aThjbzh4MDB6OTNtcDV0dWgwdnBsbiJ9.4SXxXi3zA8mOJpPo94-sRA';
    const map = new mapboxgl.Map({
    container: this.map.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: 15
    });

    const marker = new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(map);

  }

}
