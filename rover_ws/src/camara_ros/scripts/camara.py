#!/usr/bin/env python2

import sys
import rospy
import cv2
from std_msgs.msg import String
from sensor_msgs.msg import Image
from cv_bridge import CvBridge, CvBridgeError

#!/usr/bin/env python2
#cap = cv2.VideoCapture()
#while(True):
    # Capture frame-by-frame
    #ret, frame = cap.read()

    # Our operations on the frame come here
    #gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Display the resulting frame
    #cv2.imshow('frame',gray)
    #if cv2.waitKey(1) & 0xFF == ord('q'):
    #    break

# When everything done, release the capture
#cap.release()
#cv2.destroyAllWindows()
def publiSimple():
    image_pub = rospy.Publisher("image_topic",Image, queue_size=10) 
    rospy.init_node('image_pub', anonymous=True)
    rate = rospy.Rate(10) # 10hz
    bridge = CvBridge()
    cap = cv2.VideoCapture(2)
    while not rospy.is_shutdown():
        ret, cv_image = cap.read()
        image_message = bridge.cv2_to_imgmsg(cv_image, "bgr8")
        #rospy.loginfo()
        image_pub.publish(image_message)
        rate.sleep()


if __name__ == '__main__':
    try:
        publiSimple()
    except rospy.ROSInterruptException:
        pass
