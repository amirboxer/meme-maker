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
    lines: [
        {
            txt: '',
            size: 40,
            color: 'red',
            strokeStyle: 'white',
            fillStyle: 'red'
        }
    ]
}

// getters
function getMemeImgSrc() {
    return gMeme.imgSrc
}

function getMemeText() {
    return gMeme.lines[getMemeLineInd()].txt
}

function getMemeFontSize() {
    return gMeme.lines[getMemeLineInd()].size
}

function getMemeLineInd() {
    return gMeme.selectedLineIdx
}

function getMemeStrokeStyle() {
    return gMeme.lines[getMemeLineInd()].strokeStyle
}

function getMemeFillStyle() {
    return gMeme.lines[getMemeLineInd()].fillStyle
}

function getMemeLines() {
    return gMeme.lines
}

// setters
function setMemeImgSrc(src) {
    gMeme.imgSrc = src
}
function setMemeLineTxt(txt) {
    gMeme.lines[getMemeLineInd()].txt = txt
}

function setMemeFontSize(changeBy) {
    getMemeFontSize
    gMeme.lines[getMemeLineInd()].size = Math.max(gMeme.lines[getMemeLineInd()].size + changeBy, 1)
}

function setMemeStrokeStyle(style) {
    gMeme.lines[getMemeLineInd()].strokeStyle = style
}

function setMemeFillStyle(style) {
    gMeme.lines[getMemeLineInd()].fillStyle = style
}

function setMemeLineInd(ind) {
    gMeme.selectedLineIdx = ind
}

