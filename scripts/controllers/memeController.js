'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
let gCanvas
let gCtx
let gEditmode = false
let gLineInfocus = null
let gElMemeInput
let gStartPos

const elImg = new Image()

function setCanvas() {
    gElMemeInput = document.querySelector('.meme-main-input')
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    addListeners()
    addLineToMeme()
    renderMeme()
}

function renderMeme() {
    const originalIndex = getMemeLineIndex()
    elImg.src = getMemeImgSrc()
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
        getMemeLines().forEach((_, index) => {
            setMemeLineIndex(index)
            _drawText()
        })
        setMemeLineIndex(originalIndex)
    }
}

function _getTextFramePoints() {
    let x = getMemeX()
    let y = getMemeY()
    const text = getMemeText();
    const height = getMemeFontSize();
    const width = gCtx.measureText(text).width;

    switch (getMemeTextBaseline()) {
        case 'top':
            break;
        case 'bottom':
            y -= height
            break;
        default: // middle
            y -= height / 2
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
    return { x, width, y, height }
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the mouse ev
        ev.preventDefault()
        //* Gets the first touch point
        ev = ev.changedTouches[0]
        //* Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

// ------------------------- drawing ------------------------- //
// ----------------------------------------------------------- //

function _drawText() {
    if (gLineInfocus === getMemeLineIndex()) _drawOutFrameAround();
    _setDrawingContext();
    _drawTextContent();
}

function _setDrawingContext() {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = getMemeStrokeStyle();
    gCtx.fillStyle = setMemeFillStyle();
    gCtx.font = `${getMemeFontSize()}px Arial`;
    gCtx.textBaseline = getMemeTextBaseline();
    gCtx.textAlign = getMemeTextAlign();
}

function _drawTextContent() {
    const text = getMemeText();
    const x = getMemeX()
    const y = getMemeY()
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function _drawOutFrameAround() {
    const { x, y, height, width } = _getTextFramePoints()
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'blue'
    gCtx.fillStyle = 'orangered'
    gCtx.rect(x, y, width, height)
    gCtx.fill()
    gCtx.stroke()
    gCtx.closePath()
}

function focusOut() {
    gLineInfocus = null
    gElMemeInput.value = ''
    renderMeme()
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

// ------------------------- on actions ------------------------- //
// -------------------------------------------------------------- //

function onHandleMemeTextInput(txt) {
    setMemeLineTxt(txt)
    renderMeme()
}

function onChangefontSize(changeBy) {
    setMemeFontSize(changeBy * 2)
    renderMeme()
}

function onAddLine() {
    addLineToMeme()
    gElMemeInput.focus()
}

function onSwitchLines() {
    switchLines()
    gElMemeInput.focus()
}

function onInputFocus() {
    gLineInfocus = getMemeLineIndex()
    gElMemeInput.value = getMemeText()
    renderMeme()
}


function onDeleteLine() {
    getMemeLines().splice(getMemeLineIndex(), 1)
    // make sure at least one line is available for editing
    if (!getMemeLines().length) addLineToMeme()
    setMemeLineIndex(Math.min(getMemeLineIndex(), getMemeLines().length - 1))
    gElMemeInput.focus()
}


function onOutOfFocus(ev) {
    const target = ev.target
    if (target === gCanvas || target === gElMemeInput) return
    gLineInfocus = null
    gElMemeInput.value = ''
    renderMeme()
}


// drag drop section

function onDown(ev) {
    const pos = getEvPos(ev)
    const { lineHit, lineHitIndex } = isTextClicked(pos)
    if (!lineHit) {
        focusOut()
        return
    }
    // lines
    setMemeLineIndex(lineHitIndex)
    setMemeIsLineDraged(true)
    gLineInfocus = getMemeLineIndex()
    // events
    ev.preventDefault()
    gElMemeInput.focus()
    gElMemeInput.value = getMemeText()
    // re-render
    renderMeme()
    document.body.style.cursor = 'move'
    gStartPos = pos
}

function onMove(ev) {
    if (!isLineDraged(getMemeLineIndex())) return

    const pos = getEvPos(ev)
    //* Calc the delta, the diff we moved
    const dx = pos.x - gStartPos.x + getMemeX()
    const dy = pos.y - gStartPos.y + getMemeY()
    setMemeX(dx)
    setMemeY(dy)
    //* Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = pos
    //* The canvas is render again after every move
    renderMeme()
}

function onUp() {
    setMemeIsLineDraged(false)
    document.body.style.cursor = 'default'
}

// ------------------------- events additions ------------------------- //
// -------------------------------------------------------------------- //

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    window.addEventListener('mousedown', onOutOfFocus)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchend', onUp)
}

// ------------------------------------------------------------------------------




