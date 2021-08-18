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

echo_and_run cd "/home/steven/tatacoa_ws/src/realsense_pkg"

# ensure that Python install destination exists
echo_and_run mkdir -p "$DESTDIR/home/steven/tatacoa_ws/install/lib/python2.7/dist-packages"

# Note that PYTHONPATH is pulled from the environment to support installing
# into one location when some dependencies were installed in another
# location, #123.
echo_and_run /usr/bin/env \
    PYTHONPATH="/home/steven/tatacoa_ws/install/lib/python2.7/dist-packages:/home/steven/tatacoa_ws/build/lib/python2.7/dist-packages:$PYTHONPATH" \
    CATKIN_BINARY_DIR="/home/steven/tatacoa_ws/build" \
    "/usr/bin/python2" \
    "/home/steven/tatacoa_ws/src/realsense_pkg/setup.py" \
     \
    build --build-base "/home/steven/tatacoa_ws/build/realsense_pkg" \
    install \
    --root="${DESTDIR-/}" \
    --install-layout=deb --prefix="/home/steven/tatacoa_ws/install" --install-scripts="/home/steven/tatacoa_ws/install/bin"
