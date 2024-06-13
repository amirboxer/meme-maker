'use strict'

let gCanvas
let gCtx
const elImg = new Image()

function setCanvas() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
}

function onHandleMemeTextInput(txt) {
    setMemeLineTxt(txt)
    renderMeme()
}

function onChangefontSize(changeBy) {
    setMemeFontSize(changeBy)
    console.log(getMemeFontSize())
    renderMeme()
}

function capitalize(txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1)
}

function renderMeme() {
    const memeTxt = getMemeText()
    elImg.src = getMemeImgSrc()
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
        getMemeLines().forEach((_, index) => {
            setMemeLineInd(index)
            drawText()
        })
    }
}

function drawText(x = 100, y = 100) {
    
    gCtx.lineWidth = 2
    gCtx.strokeStyle = getMemeStrokeStyle()
    gCtx.fillStyle = setMemeFillStyle()
    gCtx.font = `${getMemeFontSize()}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    let text = getMemeText()
    // console.log(gCtx.measureText(text))
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}