#include <ros.h>
#include <geometry_msgs/Twist.h>
ros::NodeHandle node;

void roverCallBack(const geometry_msgs::Twist& cmd_vel) {
 
  if (cmd_vel.linear.x > 0) {
    digitalWrite(13, 1);
  }
  else {
    digitalWrite(13, 0);
  }
}

ros::Subscriber <geometry_msgs::Twist> sub("cmd_vel", roverCallBack);

void setup() {
  // put your setup code here, to run once:
  pinMode(13, 1);
  node.initNode();
  node.subscribe(sub);
}

void loop() {
  node.spinOnce();
  delay(1);

}
