import { Output } from '@angular/core';
import { Injectable, EventEmitter } from '@angular/core';

declare const ROSLIB: any;

@Injectable({
  providedIn: 'root'
})
export class RosService {
  // 0: not connected | 1: connected | 2: error
  ros;
  @Output() rosStatus = new EventEmitter();
  public roStatus: number = 0;

  constructor() { }

  connectROS1 = () => {
    //TODO: Disable button
    this.ros = new ROSLIB.Ros({
      url: 'ws://localhost:9090'
    })

    this.ros.on('connection', () => {
      console.log('Connected to websocket server.');
      this.rosStatus.emit(1);
      this.roStatus = 1;
      //TODO: Disable button
    });

    this.ros.on('error', (error) => {
      console.log('Error connecting to websocket server: ', error);
      this.rosStatus.emit(2);
      this.roStatus = 2;
      //TODO: Enable button
    });

    this.ros.on('close', () => {
      console.log('Connection to websocket server closed.');
      this.rosStatus.emit(0)
      this.roStatus = 0;
      //TODO: Enable button
    });
  }
}
