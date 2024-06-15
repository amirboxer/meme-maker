'use strict'

function createMemeObj(imgNum,) {
    return {
        selectedImgId: imgNum,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                size: 20,
                color: 'red'
            }
        ]
    }
}

var gMeme = {
    imgSrc: '../../style/images/bliss.png',
    selectedLineIdx: null,
    lines: []

}
function isMemeEmptyOfLines() {
    return (!getMemeLines().length)
}

function _createDefaultText(textAlign = 'center', textBaseline = 'middle', x = gCanvas.width / 2, y = gCanvas.height / 2) {
    return {
        txt: '',
        size: 40,
        strokeStyle: 'white',
        fillStyle: 'red',
        textAlign: textAlign,
        textBaseline: textBaseline,
        x,
        y,
        isDraged: false,
    }
}

function addLineToMeme() {
    const lines = getMemeLines()
    switch (lines.length) {
        case 0:
            lines.push(_createDefaultText('center', 'top', gCanvas.width / 2, 0))
            break;
        case 1:
            lines.push(_createDefaultText('center', 'bottom', gCanvas.width / 2, gCanvas.height))
            break;
        default:
            lines.push(_createDefaultText())
    }
    setMemeLineIndex(lines.length - 1)
}

function switchLines() {
    let currIndex = (getMemeLineIndex() + 1) % getMemeLines().length
    setMemeLineIndex(currIndex)
}

function isTextClicked({ x: posX, y: posY }) {
    const originalIndex = getMemeLineIndex()
    let lineHitIndex = 0
    const lines = getMemeLines()
    const lineHit = lines.findLast((_, _index) => {
        setMemeLineIndex(_index)
        const { x, y, height, width } = _getTextFramePoints()
        lineHitIndex = _index
        return inRange(posX, x, x + width) && inRange(posY, y, y + height)
    })
    setMemeLineIndex(originalIndex)
    return {lineHit, lineHitIndex}
}

function isLineDraged(lineIndex) {
    return gMeme.lines[lineIndex].isDraged
}

// ------------------------- getters -------------------------
// -----------------------------------------------------------
function getMemeImgSrc() {
    return gMeme.imgSrc
}

function getMemeText() {
    return gMeme.lines[getMemeLineIndex()].txt
}

function getMemeFontSize() {
    return gMeme.lines[getMemeLineIndex()].size
}

function getMemeLineIndex() {
    return gMeme.selectedLineIdx
}

function getMemeStrokeStyle() {
    return gMeme.lines[getMemeLineIndex()].strokeStyle
}

function getMemeFillStyle() {
    return gMeme.lines[getMemeLineIndex()].fillStyle
}

function getMemeLines() {
    return gMeme.lines
}

function getMemeTextAlign() {
    return gMeme.lines[getMemeLineIndex()].textAlign
}

function getMemeTextBaseline() {
    return gMeme.lines[getMemeLineIndex()].textBaseline
}

function getMemeX() {
    return gMeme.lines[[getMemeLineIndex()]].x
}

function getMemeY() {
    return gMeme.lines[[getMemeLineIndex()]].y
}

// ------------------------- setters -------------------------
// -----------------------------------------------------------
function setMemeImgSrc(src) {
    gMeme.imgSrc = src
}
function setMemeLineTxt(txt) {
    gMeme.lines[getMemeLineIndex()].txt = txt
}

function setMemeFontSize(changeBy) {
    getMemeFontSize
    gMeme.lines[getMemeLineIndex()].size = Math.max(gMeme.lines[getMemeLineIndex()].size + changeBy, 1)
}

function setMemeStrokeStyle(style) {
    gMeme.lines[getMemeLineIndex()].strokeStyle = style
}

function setMemeFillStyle(style) {
    gMeme.lines[getMemeLineIndex()].fillStyle = style
}

function setMemeLineIndex(ind) {
    gMeme.selectedLineIdx = ind
}

function setMemeTextAlign(textAlign) {
    gMeme.lines[getMemeLineIndex()].textAlign = textAlign
}

function setMemeTextBaseline(textBaseline) {
    gMeme.lines[getMemeLineIndex()].textBaseline = textBaseline
}

function setMemeX(x) {
    gMeme.lines[[getMemeLineIndex()]].x = x
}
function setMemeY(y) {
    gMeme.lines[[getMemeLineIndex()]].y = y
}

function setMemeIsLineDraged(bool) {
    gMeme.lines[[getMemeLineIndex()]].isDraged = bool
}