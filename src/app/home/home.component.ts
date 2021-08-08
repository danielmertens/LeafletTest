import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { DialogInfo } from '../dialog-info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  private map!: L.Map;
  private markers: L.Marker[] = [];
  public showDialog: boolean = false;
  public active: DialogInfo = { // Need to set a default one at the start.
    id: 0,
    latitude: 0,
    longitude: 0,
    text: "Dummy"
  };

  private information: DialogInfo[] = [
    {
      id: 1,
      latitude: 51.054102499708215,
      longitude: 4.455657245289956,
      text: "This is the first marker."
    },
    {
      id: 2,
      latitude: 51.19045631045617,
      longitude: 4.4136387587965,
      text: "Marker on the highway."
    }
  ]

  constructor() { }

  ngAfterViewInit(): void {
    this.fixMarkers();
    this.initializeMap();
    this.setMarkers();
  }

  /**
   * There is a bug with the markers in the library.
   * This fixes it together with an import of the assets from the library
   * Source: https://stackoverflow.com/questions/41144319/leaflet-marker-not-found-production-env
   */
  fixMarkers(){
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  initializeMap() {
    this.map = L.map('map',{
      center: [ 51.054102499708215, 4.455657245289956 ],
      zoom: 11
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 9,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

    tiles.addTo(this.map);
  }

  setMarkers() {
    this.information.forEach(element => {
      var marker = L.marker([element.latitude, element.longitude])
      .addEventListener('click', () => {
        this.active = element;
        this.showDialog = true;
      })
      .addTo(this.map);
      this.markers.push(marker);
    });
  }
}
