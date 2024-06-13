'use strict'


const gTextProperties = {
    font: "bold 48px serif",
    wordSpacing: '0px',
    textBaseline: 'middle',
    textAlign: 'center'
}

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
    imgSrc: '../../style/images/empty.png',
    selectedLineIdx: 0,
    lines: [_createDefaultText()]
}

function _createDefaultText() {
    return {
        txt: '',
        size: 40,
        strokeStyle: 'white',
        fillStyle: 'red'
    }
}

function addLineToMeme() {
    const lines = getMemeLines()
    lines.push(_createDefaultText())
    setMemeLineIndex(lines.length - 1)
}

function switchLines() {
    let currIndex = (getMemeLineIndex() + 1) % getMemeLines().length
    setMemeLineIndex(currIndex)
}

// getters
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

// setters
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

