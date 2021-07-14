#include <SoftwareSerial.h>
#include <ros.h>
#include <TinyGPS.h>
#include <sensor_msgs/NavSatFix.h>

ros::NodeHandle nh;

TinyGPS gps;
SoftwareSerial ss(4, 3);

static void smartdelay(unsigned long ms);


sensor_msgs::NavSatFix gps_msg;
ros::Publisher gps_pub("/navsat/fix", &gps_msg);

void setup()
{
  Serial.begin(115200);
  ss.begin(9600);
  
  nh.initNode();
  nh.advertise(gps_pub);
}

void loop()
{
  float flat, flon;
  unsigned long age, date, time, chars = 0;
  unsigned short sentences = 0, failed = 0;
  static const double LONDON_LAT = 51.508131, LONDON_LON = -0.128002;
  
  //print_int(gps.satellites(), TinyGPS::GPS_INVALID_SATELLITES, 5);
 
  gps.f_get_position(&flat, &flon, &age);
  gps_msg.latitude = flat;
  gps_msg.longitude = flon;
  gps_pub.publish( &gps_msg );
  nh.spinOnce();
  smartdelay(1000);
}

static void smartdelay(unsigned long ms)
{
  unsigned long start = millis();
  do 
  {
    while (ss.available())
      gps.encode(ss.read());
  } while (millis() - start < ms);
}
