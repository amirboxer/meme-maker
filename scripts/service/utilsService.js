'use strict' 

function inRange(num, min, max) {
    return num >= min && max >= num
}

const degreesToRads = deg => (deg * Math.PI) / 180.0;

const radsToDegrees = rad => (rad * 180.0) / Math.PI;
