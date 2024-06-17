'use strict' 

function inRange(num, min, max) {
    return num >= min && max >= num
}

const degreesToRads = deg => (deg * Math.PI) / 180.0;

const radsToDegrees = rad => (rad * 180.0) / Math.PI;

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }