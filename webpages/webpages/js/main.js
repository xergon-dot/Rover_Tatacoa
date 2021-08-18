// Connecting to ROS
// -----------------
connect = () => {
    console.log("Connect to rosbridge server!!")
    var ros = new ROSLIB.Ros({
        url : 'ws://localhost:9090'
    });

    ros.on('connection', function() {
        console.log('Connected to websocket server.');
    });

    ros.on('error', function(error) {
        console.log('Error connecting to websocket server: ', error);
    });
    
    ros.on('close', function() {
        console.log('Connection to websocket server closed.');
    });
}

// Publishing a Topic
// ------------------
forward = () => {
    var cmdVel = new ROSLIB.Topic({
        ros : ros,
        name : 'turtle1/cmd_vel',
        messageType : 'geometry_msgs/Twist'
    });
    
    var twist = new ROSLIB.Message({
        linear : {
        x : 2.0,
        y : 0.0,
        z : 0.0
        },
        angular : {
        x : 0.0,
        y : 0.0,
        z : 0.0
        }
    });
    console.log("Publishing cmd_vel")
    cmdVel.publish(twist);
}

left = () => {
    var cmdVel = new ROSLIB.Topic({
        ros : ros,
        name : 'turtle1/cmd_vel',
        messageType : 'geometry_msgs/Twist'
    });
    
    var twist = new ROSLIB.Message({
        linear : {
        x : 0.0,
        y : 0.0,
        z : 0.0
        },
        angular : {
        x : 0.0,
        y : 0.0,
        z : 1.8
        }
    });
    console.log("Publishing cmd_vel")
    cmdVel.publish(twist);
}

right = () => {
    var cmdVel = new ROSLIB.Topic({
        ros : ros,
        name : 'turtle1/cmd_vel',
        messageType : 'geometry_msgs/Twist'
    });
    
    var twist = new ROSLIB.Message({
        linear : {
        x : 0.0,
        y : 0.0,
        z : 0.0
        },
        angular : {
        x : 0.0,
        y : 0.0,
        z : -1.8
        }
    });
    console.log("Publishing cmd_vel")
    cmdVel.publish(twist);
}

reverse = () => {
    var cmdVel = new ROSLIB.Topic({
        ros : ros,
        name : 'turtle1/cmd_vel',
        messageType : 'geometry_msgs/Twist'
    });
    
    var twist = new ROSLIB.Message({
        linear : {
        x : -2.0,
        y : 0.0,
        z : 0.0
        },
        angular : {
        x : 0.0,
        y : 0.0,
        z : 0.0
        }
    });
    console.log("Publishing cmd_vel")
    cmdVel.publish(twist);
}

// Subscribe a topic

var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/camera_rgb',
    messageType : 'sensor_msgs/CompressedImage'
});

listener.subscribe(function(message) {
    // console.log('Received message on ' + listener.name + ': ' + message.data);
    // listener.unsubscribe();
    document.getElementById("my_image").src = "data:image/jpg;base64," + message.data;
});
