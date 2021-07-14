//************************** ROS ********************************
#include <ros.h>
#include <geometry_msgs/Twist.h>
#include <std_msgs/Int32.h>

ros::NodeHandle node;

void messageCb( const std_msgs::Int32 toggle_msg) {
  if (toggle_msg.data == 1) {
    //modo autonomo
    digitalWrite(13, HIGH);
    digitalWrite(12, LOW);// blink the led
  }
  if (toggle_msg.data == 0) {
    //modo manual
    digitalWrite(12, HIGH);   // blink the led
    digitalWrite(13, LOW);
  }

}

void roverCallBack(const geometry_msgs::Twist& cmd_vel) {

  if (cmd_vel.angular.z > 0) {

    a_horario();

  } else if (cmd_vel.angular.z < 0) {

    horario();

  } else if (cmd_vel.linear.x > 0) {

    avanzar();

  } else {

    parar();

  }

}

ros::Subscriber<std_msgs::Int32> sub2("toggle_led", &messageCb );

ros::Subscriber <geometry_msgs::Twist> sub("cmd_vel", roverCallBack);

//**************************MOTORES********************************
//motor 2
/*
   ----pin7 Dir
   ----pin6 Enb
*/
//motor 1
/*
   ----pin4 Dir
   ----pin5 Enb
*/


void parar() {
  digitalWrite(5, 0);
  digitalWrite(6, 0);
}

void avanzar() {
  digitalWrite(5, 1);
  digitalWrite(6, 1);

  digitalWrite(7, 0);
  digitalWrite(4, 0);
}
void horario() {
  digitalWrite(5, 1);
  digitalWrite(6, 1);

  digitalWrite(7, 1);
  digitalWrite(4, 0);
}
void a_horario() {
  digitalWrite(5, 1);
  digitalWrite(6, 1);

  digitalWrite(7, 0);
  digitalWrite(4, 1);
}




void setup() {

  pinMode(13, OUTPUT);
  pinMode(12, OUTPUT);

  for (int i = 4; i <= 7; i++) {
    pinMode(i, OUTPUT);
  }


  node.initNode();
  node.subscribe(sub);
  node.subscribe(sub2);
}

void loop() {
  node.spinOnce();
  delay(1);

}
