'use strict'

let gCanvas
let gCtx
const elImg = new Image()

function setCanvas() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
}

function handleMemeTextInput(txt) {
    setLineTxt(txt)
    renderMeme()
}

function capitalize(txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1)
}


function renderMeme() {
    if (!getMemeImgSrc()) {
        drawText(memeTxt, 0, 0)
        return
    }
    elImg.src = getMemeImgSrc()
    const memeTxt = getMemeText()
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
        drawText(memeTxt, 0, 0)
    }
}

function drawText(text, x = 0, y = 0) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    // gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}