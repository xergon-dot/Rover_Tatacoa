import { Injectable } from '@angular/core';
import { SensorInterface } from 'src/app/interfaces/sensors/sensor-interface';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor() { }

  openConfigFile() {
    let requestJSON = new XMLHttpRequest();
    requestJSON.open("GET", "./../../../../assets/config.json", false);
    requestJSON.send(null);
    let data = JSON.parse(requestJSON.responseText);
    return data;
  }

}
