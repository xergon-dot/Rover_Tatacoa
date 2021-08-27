#!/usr/bin/env python

import cv2
import sys
import rospy
from cv_bridge import CvBridge
from std_msgs.msg import String
from sensor_msgs.msg import Image, CompressedImage
import time

class realSenseRGBPublisherNode():
    def __init__(self):
        self.cap = cv2.VideoCapture(0)
        self.publisher = rospy.Publisher("camera_rgb", CompressedImage, queue_size=5)
        self.timer = rospy.Timer(rospy.Duration.from_sec(0.01), self.timer_callback)
        self.bridge = CvBridge()

    def timer_callback(self, event):
        test, frame = self.cap.read()
        print(frame.size)
        # rospy.loginfo(self.bridge.cv2_to_imgmsg(frame, "bgr8"))
        self.publisher.publish(self.bridge.cv2_to_compressed_imgmsg(frame, dst_format="jpg"))

def main():
    rospy.init_node('realsense_rgb_publisher_node', anonymous = True)
    rgbPub = realSenseRGBPublisherNode()
    try:
        rospy.spin()
    except KeyboardInterrupt:
        rgbPub.cap.release()
        rospy.logdebug("Shutting down")

if __name__ == "__main__":
    try:
        main()
    except rospy.ROSInterruptException:
        pass