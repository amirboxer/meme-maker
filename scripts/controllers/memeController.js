'use strict'

let gCanvas
let gCtx
const elImg = new Image()

function setCanvas() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d') 
    addLineToMeme()
}

function renderMeme() {
    elImg.src = getMemeImgSrc()
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
        getMemeLines().forEach((_, index) => {
            setMemeLineIndex(index)
            _drawText()
        })
    }
}


// ------------------------- drawing ------------------------- //
// ----------------------------------------------------------- //

function _drawText() {
    const text = getMemeText();
    const fontSize = getMemeFontSize();
    const textWidth = gCtx.measureText(text).width;
    const x = getMemeX()
    const y = getMemeY()

    _setDrawingContext();
    _drawOutFrameAround(x, y, textWidth, fontSize);
    _drawTextContent(text, x, y);
}

function _setDrawingContext() {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = getMemeStrokeStyle();
    gCtx.fillStyle = setMemeFillStyle();
    gCtx.font = `${getMemeFontSize()}px Arial`;
    gCtx.textBaseline = getMemeTextBaseline();
    gCtx.textAlign = getMemeTextAlign();
}

function _drawTextContent(text, x, y) {
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function _drawOutFrameAround(x = gCanvas.width / 2, y = gCanvas.height / 2, width, hieght) {
    switch (getMemeTextBaseline()) {
        case 'top':
            break;
        case 'bottom':
            y -= hieght
            break;
        default: // middle
            y -= hieght / 2
    }

    switch (getMemeTextAlign()) {
        case 'left':
            break;
        case 'right':
            x -= width
            break;
        default: // center
            x -= width / 2
    }
    
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'blue'
    gCtx.fillStyle = 'orangered'
    gCtx.rect(x, y, width, hieght)
    gCtx.fill()
    gCtx.stroke()
    gCtx.closePath()
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}
// ------------------------- on inputs ------------------------- //
// ------------------------------------------------------------- //

function onHandleMemeTextInput(txt) {
    if (isMemeEmptyOfLines()) addLineToMeme()
    setMemeLineTxt(txt)
    renderMeme()
}

function onChangefontSize(changeBy) {
    setMemeFontSize(changeBy * 2)
    renderMeme()
}

function onAddLine() {
    const elMemeInput = document.querySelector('.meme-main-input')
    elMemeInput.focus()
    elMemeInput.value = ''
    addLineToMeme()
}

function onSwitchLines() {
    switchLines()
    const elMemeInput = document.querySelector('.meme-main-input')
    elMemeInput.value = getMemeText()
    elMemeInput.focus()
}

function onInputFocus(elMemeInput) {
    if (isMemeEmptyOfLines()) return
    elMemeInput.value = getMemeText()
}

function onInputFocusOut(elMemeInput) {
    elMemeInput.value = ''
}

function onDeleteLine() {
    if (isMemeEmptyOfLines()) return
    getMemeLines().splice(getMemeLineIndex(), 1)
    // TODO not sure about it
    setMemeLineIndex(Math.min(getMemeLineIndex(), getMemeLines.length - 1))
    renderMeme()
}
