#!/usr/bin/env python
# -- coding: utf-8 --


import numpy as np
import cv2
import rospy
from sensor_msgs.msg import Image
from std_msgs.msg import String
from cv_bridge import CvBridge, CvBridgeError
import cv2.aruco as aruco
import imutils

bridge = CvBridge()

def centroid(*points):
    x_coords = [p[0] for p in points]
    y_coords = [p[1] for p in points]
    _len = len(points)
    centroid_x = int(sum(x_coords)/_len)
    centroid_y = int(sum(y_coords)/_len)
    return [centroid_x, centroid_y]

def printCentroid(corners):
    centroidPoint = centroid(corners[0][0][0], corners[0][0][1], corners[0][0][2], corners[0][0][3])
    centroid_pub.publish(str(centroidPoint))
    cv2.circle(img, (centroidPoint[0], centroidPoint[1]), 5, (255, 255, 0), -1)
    cv2.putText(img, "Centroid", (centroidPoint[0] - 20, centroidPoint[1] - 20),
        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (204, 255, 0), 2)

def mainPub():  
    rospy.init_node("video_publisher", anonymous=True)
    img_pub = rospy.Publisher("/camera/image_raw", Image,
                              queue_size=10)
    global centroid_pub
    centroid_pub = rospy.Publisher('Centroids', String, queue_size=10)
    ##Selecionamos puerto camara
    video = cv2.VideoCapture(6)
    fps = video.get(cv2.CAP_PROP_FPS)
    print fps
    rate = rospy.Rate(fps)

    while not rospy.is_shutdown() and video.grab():
        global img
        tmp, img = video.retrieve()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        aruco_dict = aruco.Dictionary_get(aruco.DICT_6X6_1000)
        arucoParameters = aruco.DetectorParameters_create()
        corners, ids, rejectedImgPoints = aruco.detectMarkers(gray, aruco_dict, parameters=arucoParameters)
        img = aruco.drawDetectedMarkers(img, corners, ids)
        if len(corners) > 0: 
            printCentroid(corners)
        cv2.imshow('Display', img)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        if not tmp:
            print "Could not grab frame."
            break
        try:
            img_msg = bridge.cv2_to_imgmsg(img, "bgr8")
            img_msg.header.stamp = rospy.Time.now()
            img_msg.header.frame_id = "camera"
            img_pub.publish(img_msg)
        except CvBridgeError as err:
            print err
        rate.sleep()
    return
if __name__ == '__main__':
    try:
        mainPub()
    except rospy.ROSInterruptException:
        pass   
    while(True):
        ret, frame = cap.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        aruco_dict = aruco.Dictionary_get(aruco.DICT_6X6_1000)
        arucoParameters = aruco.DetectorParameters_create()
        corners, ids, rejectedImgPoints = aruco.detectMarkers(gray, aruco_dict, parameters=arucoParameters)
        frame = aruco.drawDetectedMarkers(frame, corners, ids)
        if len(corners) > 0: 
            printCentroid(corners)
        cv2.imshow('Display', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()
