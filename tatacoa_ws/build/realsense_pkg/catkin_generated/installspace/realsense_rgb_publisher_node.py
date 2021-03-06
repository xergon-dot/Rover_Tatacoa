#!/usr/bin/env python2

import cv2
import sys
import rospy
from cv_bridge import CvBridge
from std_msgs.msg import String
from sensor_msgs.msg import Image, CompressedImage
import time

class realSenseRGBPublisherNode():
    def __init__(self):
        self.publisher = rospy.Publisher("camera_rgb", CompressedImage, queue_size=5)
        self.timer = rospy.Timer(rospy.Duration.from_sec(0.000001), self.timer_callback)
        self.bridge = CvBridge()
        self.cap = cv2.VideoCapture(3)

    def timer_callback(self, event):
        rospy.loginfo('---')
        rospy.loginfo(rospy.get_time())
        test, frame = self.cap.read()
        rospy.loginfo(rospy.get_time())
        # print(frame.size)
        # rospy.loginfo(self.bridge.cv2_to_imgmsg(frame, "bgr8"))

        self.publisher.publish(self.bridge.cv2_to_compressed_imgmsg(frame, dst_format="jpg"))
        rospy.loginfo(rospy.get_time())

def main():
    rospy.init_node('realsense_rgb_publisher_node', anonymous = True)
    rgbPub = realSenseRGBPublisherNode()
    try:
        rospy.spin()
    except KeyboardInterrupt:
        rospy.logdebug("Shutting down")

if __name__ == "__main__":
    try:
        main()
    except rospy.ROSInterruptException:
        pass