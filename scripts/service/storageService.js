'use strict'

function loadDataInLocS(key) {
    return JSON.parse(localStorage.getItem(key)) 
}

function sroteDataInLocS(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function deleteFormLocS(key) {
    localStorage.removeItem(key);
}