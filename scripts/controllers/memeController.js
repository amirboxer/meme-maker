'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
let gCanvas
let gCtx
let gEditmode = false
let gLineInfocus = null
let gElMemeInput
let gElFontFamInput
let gElStrokeStyleInput
let gElStrokeFillInput
let gElRoteteInput

let gStartPos

const elImg = new Image()

function setCanvas() {
    gElMemeInput = document.querySelector('.meme-main-input')
    gElFontFamInput = document.querySelector('.font-family-input')
    gElStrokeStyleInput = document.querySelector('.stroke-Style-color-input')
    gElStrokeFillInput = document.querySelector('.fill-Style-color-input')
    gElRoteteInput = document.querySelector('.rotate-input')

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

function getTextFramePoints() {
    let x = getMemeX()
    let y = getMemeY()
    const text = getMemeText();
    const height = getMemeFontSize();
    const width = gCtx.measureText(text).width;

    switch (getMemeTextBaseline()) {
        case 'top':
            break
        case 'bottom':
            y -= height
            break
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

function getCenterOfRotation() {
    let x = getMemeX()
    let y = getMemeY()
    const text = getMemeText();
    const height = getMemeFontSize();
    const width = gCtx.measureText(text).width;

    switch (getMemeTextBaseline()) {
        case 'top':
            y += height / 2
            break
        case 'bottom':
            y -= height / 2
            break
    }

    switch (getMemeTextAlign()) {
        case 'left':
            x += width / 2
            break
        case 'right':
            x -= width / 2
            break
    }

    return { x, y }
}

// ------------------------- drawing ------------------------- //
// ----------------------------------------------------------- //

function _drawText() {
    _setDrawingContext();
    if (gLineInfocus === getMemeLineIndex()) _drawOutFrameAround();
    _drawTextContent();
    // reset rotaion
    gCtx.resetTransform();
}

function _setDrawingContext() {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = getMemeStrokeStyle();
    gCtx.fillStyle = getMemeFillStyle();
    gCtx.font = `${getMemeFontSize()}px ${getMemeFontFamily()}`;
    gCtx.textBaseline = getMemeTextBaseline();
    gCtx.textAlign = getMemeTextAlign();
    gCtx.letterSpacing = getMemeLetterSpacing() + 'px'

    // rotation
    const { x, y } = getCenterOfRotation()
    const rad = getMemeRotation()
    rotateCanvas({ x, y }, rad)
}

function _drawTextContent() {
    const text = getMemeText();
    const x = getMemeX()
    const y = getMemeY()
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function _drawOutFrameAround() {
    const { x, y, height, width } = getTextFramePoints()
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


function rotateCanvas({ x, y }, rad) {
    gCtx.translate(x, y);
    gCtx.rotate(rad);
    // reset translation
    gCtx.translate(-x, -y);
}

// -+-+-+-+-+-+-+-+-+-+-+-+ on actions -+-+-+-+-+-+-+-+-+-+-+-+ //
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ //
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ //


// - - - - - - meme editor - - - - - - //
// - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - //

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

function setInputsRealVals() {
    gElFontFamInput.value = getMemeFontFamily()
    gElStrokeStyleInput.value = getMemeStrokeStyle()
    gElStrokeFillInput.value = getMemeFillStyle()
    gElMemeInput.value = getMemeText()
    gElRoteteInput.value = radsToDegrees(getMemeRotation())
}

function onDeleteLine() {
    getMemeLines().splice(getMemeLineIndex(), 1)
    // make sure at least one line is available for editing
    if (!getMemeLines().length) addLineToMeme()
    setMemeLineIndex(Math.min(getMemeLineIndex(), getMemeLines().length - 1))
    gElMemeInput.focus()
}

function onChnageColors(style, component) {
    switch (component) {
        case 'stroke':
            setMemeStrokeStyle(style)
            break
        case 'fill':
            setMemeFillStyle(style)
    }
    renderMeme()
}

function onFontFamilyChange(fFam) {
    setMemeFontFamily(fFam)
    renderMeme()
}

function onChangeLeterSpacing(sz) {
    const space = Math.max(getMemeLetterSpacing() + sz, 0)
    setMemeLetterSpacing(space)
    renderMeme()
}

function onRotate(deg) {
    const rad = degreesToRads(+deg)
    setMemeRotation(rad)
    renderMeme()
}

function onTextAlignmentChange(pos) {
    setMemeTextAlign(pos)
    switch (pos) {
        case 'left':
            setMemeX(0)
            break
        case 'center':
            setMemeX(gCanvas.width / 2)
            break
        case 'right':
            setMemeX(gCanvas.width)
            break
    }
    renderMeme()
}

function onTextBaselineChange(pos) {
    setMemeTextBaseline(pos)
    switch (pos) {
        case 'top':
            setMemeY(0)
            break
        case 'middle':
            setMemeY(gCanvas.height / 2)
            break
        case 'bottom':
            setMemeY(gCanvas.height)
            break
    }
    renderMeme()
}

// - - - - - - focus events - - - - - - //
// - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - //


function onInputFocus() {
    gLineInfocus = getMemeLineIndex()
    setInputsRealVals()
    renderMeme()
}


function onFontFamilyFocus() {
    gElFontFamInput.value = ''
}

function onFontFamilyBlur() {
    gElFontFamInput.value = getMemeFontFamily()
}




// - - drag drop section keyboard events - - //
// - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - //

function onkeydown(ev) {
    if (gLineInfocus === null) return // can also be 0

    switch (ev.keyCode) {
        case 38: // up arrow
            setMemeY(getMemeY() - 1)
            break
        case 40: // down arrow
            setMemeY(getMemeY() + 1)
            break
        case 37: // left arrow
            setMemeX(getMemeX() - 1)
            break
        case 39: // right arrow
            setMemeX(getMemeX() + 1)
            break
    }
    renderMeme()
}

// - - drag drop section mouse events - - //
// - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - //

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
    setInputsRealVals()
    gElMemeInput.focus()
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

function onOutOfFocus(ev) { // apllies to window
    const target = ev.target
    if (target === gCanvas || target === gElMemeInput) return
    gLineInfocus = null
    gElMemeInput.value = ''
    renderMeme()
}


// ------------------------- events additions ------------------------- //
// -------------------------------------------------------------------- //

function addListeners() {
    addKeyboaedListeners()
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    // window
    window.addEventListener('mousedown', onOutOfFocus)
    //canvas
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    // window
    window.addEventListener('touchstart', onOutOfFocus)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchend', onUp)
}

function addKeyboaedListeners() {
    // window
    window.addEventListener('keydown', onkeydown)
}
// ------------------------------------------------------------------------------




