import { Component, OnInit } from '@angular/core';
import { CameraInterface } from 'src/app/interfaces/cameras/camera-interface';
import { FilesService } from 'src/app/services/files/files.service';
import { RosService } from 'src/app/services/ros/ros.service';
declare const ROSLIB: any;

@Component({
  selector: 'app-camaras',
  templateUrl: './camaras.component.html',
  styleUrls: ['./camaras.component.css']
})
export class CamarasComponent implements OnInit {
  cameras: CameraInterface[];
  camerasList: CameraInterface[] = [];
  listeners: any[] = [];
  rosStatus;
  constructor(
    private rosService: RosService,
    private filesService: FilesService,
  ) {

  }

  ngOnInit(): void {
    this.subscribeRosStatus();
    let config = this.filesService.openConfigFile();
    this.cameras = config.cameras;
    (this.rosService.roStatus) ? this.rosStatus = 1 : this.rosStatus = 0;
    if (this.rosStatus == 1) {
      this.subscribeToTopic();
    }
  }

  subscribeToTopic(){
    this.camerasList = [];
    this.listeners = [];
    this.cameras.forEach((element: CameraInterface) => {
      if(element.enable){
        this.camerasList.push(element);
        let listener = new ROSLIB.Topic({
          ros: this.rosService.ros,
          name: element.topic,
          messageType: element.msgType
        })
        this.listeners.push(listener);
      } else {
        console.log(element.name + " is disabled");
      }
    });
    console.log("Setting up " + this.listeners.length + " listener")
    this.listeners.forEach((listener, index) => {
      listener.subscribe(function (message) {
        // document.getElementById("my_image").src = "data:image/jpg;base64," + message.data;
        let image = document.getElementById("camera" + index) as HTMLImageElement;
        image.src = "data:image/jpg;base64," + message.data;
      });
    });
  }

  onStartClick() {
    this.subscribeToTopic();
  }

  onStopClick() {
    this.listeners.forEach(listener => {
      console.log("Stopping listener: " + listener.name);
      listener.unsubscribe();
    })
    this.listeners = [];
  }

  subscribeRosStatus() {
    this.rosService.rosStatus.subscribe(status => {
      switch (status) {
        case 0:
          console.log("No conectado")
          if (this.rosStatus == 2) {
            this.rosStatus = 2;
          } else {
            this.rosStatus = 0;
          }
          break;
        case 1:
          console.log("Conectado a ROS 1")
          this.rosStatus = 1
          break;
        case 2:
          console.log("No se pudo conectar con ROS 1")
          this.rosStatus = 2
          break;

        default:
          break;
      }
    })
  }

}
