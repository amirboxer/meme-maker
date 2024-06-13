'use strict'

function onDownload(elLink) {
    const imgContent = gCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.down
    elLink.download="meme.jpg"
    elLink.href = imgContent
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

// Read the file from the input
// When done send the image to the callback function
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let elImg = new Image()
        elImg.src = event.target.result
        elImg.onload = () => onImageReady(elImg)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(elImg) {
    // Draw the img on the canvas
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}