#!/usr/bin/env python
# license removed for brevity
import rospy
from std_msgs.msg import String,Int32MultiArray,Int64
import numpy as np


def publiSimple():
    pub = rospy.Publisher('topic_1', String, queue_size=10) 
    rospy.init_node('Tx', anonymous=True)
    rate = rospy.Rate(10) # 10hz
    while not rospy.is_shutdown():
        hello_str = "Hola mundo %s" % rospy.get_time()
        rospy.loginfo(hello_str)
        pub.publish(hello_str)
        rate.sleep()

def publiImg():
    pub = rospy.Publisher('img', Int32MultiArray, queue_size=10) 
    rospy.init_node('Camara', anonymous=True)
    rate = rospy.Rate(10) # 10hz
    while not rospy.is_shutdown():
        list1= np.random.randint(100)
        rospy.loginfo([1,2,3])
        pub.publish([])
        rate.sleep()

if __name__ == '__main__':
    try:
        publiImg()
    except rospy.ROSInterruptException:
        pass