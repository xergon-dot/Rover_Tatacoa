import { Component, OnInit } from '@angular/core';
import { RosService } from 'src/app/services/ros/ros.service';
declare const ROSLIB: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  ros;
  rosConnected: boolean = false;
  constructor(
    private rosService: RosService
  ) {
    this.subscribeRosStatus();
  }

  ngOnInit(): void {
    (this.rosService.roStatus) ? this.rosConnected = true : this.rosConnected = false;
  }

  forward = () => {
    this.ros = this.rosService.ros;
    console.log("Foward")
    var cmdVel = new ROSLIB.Topic({
      ros: this.ros,
      name: 'turtle1/cmd_vel',
      messageType: 'geometry_msgs/Twist'
    });

    var twist = new ROSLIB.Message({
      linear: {
        x: 2.0,
        y: 0.0,
        z: 0.0
      },
      angular: {
        x: 0.0,
        y: 0.0,
        z: 0.0
      }
    });
    console.log("Publishing cmd_vel")
    cmdVel.publish(twist);
  }

  left = () => {
    this.ros = this.rosService.ros;
    console.log("Left");
    var cmdVel = new ROSLIB.Topic({
      ros: this.ros,
      name: 'turtle1/cmd_vel',
      messageType: 'geometry_msgs/Twist'
    });

    var twist = new ROSLIB.Message({
      linear: {
        x: 0.0,
        y: 0.0,
        z: 0.0
      },
      angular: {
        x: 0.0,
        y: 0.0,
        z: 1.8
      }
    });
    console.log("Publishing cmd_vel")
    cmdVel.publish(twist);
  }

  right = () => {
    this.ros = this.rosService.ros;
    console.log("Right");
    var cmdVel = new ROSLIB.Topic({
      ros: this.ros,
      name: 'turtle1/cmd_vel',
      messageType: 'geometry_msgs/Twist'
    });

    var twist = new ROSLIB.Message({
      linear: {
        x: 0.0,
        y: 0.0,
        z: 0.0
      },
      angular: {
        x: 0.0,
        y: 0.0,
        z: -1.8
      }
    });
    console.log("Publishing cmd_vel")
    cmdVel.publish(twist);
  }

  reverse = () => {
    this.ros = this.rosService.ros;
    console.log("Reverse");
    var cmdVel = new ROSLIB.Topic({
      ros: this.ros,
      name: 'turtle1/cmd_vel',
      messageType: 'geometry_msgs/Twist'
    });

    var twist = new ROSLIB.Message({
      linear: {
        x: -2.0,
        y: 0.0,
        z: 0.0
      },
      angular: {
        x: 0.0,
        y: 0.0,
        z: 0.0
      }
    });
    console.log("Publishing cmd_vel")
    cmdVel.publish(twist);
  }

  subscribeRosStatus(){
    this.rosService.rosStatus.subscribe(status=>{
      switch (status) {
        case 0:
          console.log("No conectado")
          this.rosConnected = false;
          break;
        case 1:
          console.log("Conectado a ROS 1")
          this.rosConnected = true;
          break;
        case 2:
          console.log("No se pudo conectar con ROS 1")
          this.rosConnected = false;
          break;
      
        default:
          break;
      }
    })
  }
}
