#!/usr/bin/env python

import rospy
from std_msgs.msg import String

def talker():
    # Create publisher
    publisher = rospy.Publisher("camera_hello", String, queue_size=2)
    # Initialize the node with rospy
    rospy.init_node('talker_node', anonymous = True)
    rate = rospy.Rate(10)
    while not rospy.is_shutdown():
        msg = String()
        msg.data = "Hello from Intel Realsense %s" % rospy.get_time()
        rospy.loginfo(msg)
        publisher.publish(msg)
        rate.sleep()

if __name__ == "__main__":
    try:
        talker()
    except rospy.ROSInterruptException:
        pass