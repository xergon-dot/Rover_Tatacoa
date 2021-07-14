#!/bin/sh

if [ -n "$DESTDIR" ] ; then
    case $DESTDIR in
        /*) # ok
            ;;
        *)
            /bin/echo "DESTDIR argument must be absolute... "
            /bin/echo "otherwise python's distutils will bork things."
            exit 1
    esac
fi

echo_and_run() { echo "+ $@" ; "$@" ; }

echo_and_run cd "/home/xergon/Documentos/Rover/rover_ws/src/rosserial/rosserial_client"

# ensure that Python install destination exists
echo_and_run mkdir -p "$DESTDIR/home/xergon/Documentos/Rover/rover_ws/install/lib/python2.7/dist-packages"

# Note that PYTHONPATH is pulled from the environment to support installing
# into one location when some dependencies were installed in another
# location, #123.
echo_and_run /usr/bin/env \
    PYTHONPATH="/home/xergon/Documentos/Rover/rover_ws/install/lib/python2.7/dist-packages:/home/xergon/Documentos/Rover/rover_ws/build/lib/python2.7/dist-packages:$PYTHONPATH" \
    CATKIN_BINARY_DIR="/home/xergon/Documentos/Rover/rover_ws/build" \
    "/usr/bin/python2" \
    "/home/xergon/Documentos/Rover/rover_ws/src/rosserial/rosserial_client/setup.py" \
     \
    build --build-base "/home/xergon/Documentos/Rover/rover_ws/build/rosserial/rosserial_client" \
    install \
    --root="${DESTDIR-/}" \
    --install-layout=deb --prefix="/home/xergon/Documentos/Rover/rover_ws/install" --install-scripts="/home/xergon/Documentos/Rover/rover_ws/install/bin"
