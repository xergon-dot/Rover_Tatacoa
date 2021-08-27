#!/usr/bin/env python2

import rospy
from std_msgs.msg import String
import cv2
import time

def talker():
    # Create publisher
    publisher = rospy.Publisher("cameras", String, queue_size=2)
    # Initialize the node with rospy
    rospy.init_node('available_cameras_node', anonymous = True)
    rate = rospy.Rate(10)
    while not rospy.is_shutdown():
        msg = String()
        tests = [x for x in range(0, 10)] #
        for index, i in enumerate(tests):
            cap = cv2.VideoCapture(index)
            test, frame = cap.read()
            if test:
                tests[i] = index
            else:
                tests[i] = False
        msg.data = str(tests)
        rospy.loginfo(msg)
        publisher.publish(msg)
        rate.sleep()
        rospy.loginfo("Detener")

if __name__ == "__main__":
    try:
        talker()
    except rospy.ROSInterruptException:
        pass