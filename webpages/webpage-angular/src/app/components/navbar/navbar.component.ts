import { Component, OnInit } from '@angular/core';
import { RosService } from 'src/app/services/ros/ros.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  data;
  rosStatus = 0;
  constructor(
    private rosService: RosService
  ) {
    this.subscribeRosStatus();
  }

  ngOnInit(): void {
    let requestJSON = new XMLHttpRequest();
    requestJSON.open("GET", './../../assets/config.json', false);
    requestJSON.send(null);
    this.data = JSON.parse(requestJSON.responseText)
  }

  onConnectROS1(){
    console.log("onConnectROS1");
    this.rosService.connectROS1();
  }

  subscribeRosStatus(){
    this.rosService.rosStatus.subscribe(status=>{
      switch (status) {
        case 0:
          console.log("No conectado")
          if(this.rosStatus==2){
            this.rosStatus = 2;
          }else{
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
