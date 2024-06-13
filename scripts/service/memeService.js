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
    imgSrc: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            color: 'red'
        }
    ]

}

// getters
function getMemeImgSrc() {
    return gMeme.imgSrc
}

function getMemeText(lineIndex = 0) {
    return gMeme.lines[lineIndex].txt
}

// setters
function setLineTxt(txt, lineIndex = 0) {
    gMeme.lines[lineIndex].txt = txt
}

function setImgSrc(src) {
    gMeme.imgSrc = src
}



