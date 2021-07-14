#!/usr/bin/env python2
# license removed for brevity
import rospy
from std_msgs.msg import String

def publiSimple():
    pub = rospy.Publisher('topic_1', String, queue_size=10) 
    rospy.init_node('Tx', anonymous=True)
    rate = rospy.Rate(10) # 10hz
    while not rospy.is_shutdown():
        hello_str = "Hola mundo %s" % rospy.get_time()
        rospy.loginfo(hello_str)
        pub.publish(hello_str)
        rate.sleep()

if __name__ == '__main__':
    try:
        publiSimple()
    except rospy.ROSInterruptException:
        pass