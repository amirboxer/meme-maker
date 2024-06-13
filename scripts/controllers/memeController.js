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
    setMemeFontSize(changeBy * 2)
    renderMeme()
}

function renderMeme() {
    elImg.src = getMemeImgSrc()
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
        getMemeLines().forEach((_, index) => {
            setMemeLineIndex(index)
            drawText()
        })
    }
}

function onAddLine() {
    const memeInput = document.querySelector('.meme-main-input')
    memeInput.value = ''
    memeInput.focus()
    addLineToMeme()
}

function onSwitchLines() {

}

function drawText(x=gCanvas.width / 2, y=gCanvas.height / 2) {
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