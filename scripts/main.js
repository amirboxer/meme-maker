'use strict'

var gSavedMemes
const MAX_SAVES = 10
const SAVED_KEY = 'SAVED_MEMES'

function onInit() {
    renderGallery()
    setCanvas()
    _loadSavedMemes()
}

function _loadSavedMemes() {
    gSavedMemes = (loadDataInLocS(SAVED_KEY) || [])
}

function onSaveMeme() {
    if (gSavedMemes.length >= MAX_SAVES) {
        gSavedMemes.splice(gSavedMemes.length - 1, 1)
    }
    const memeHTML = _memeToHTML(gMeme)
    gSavedMemes.unshift({ html: memeHTML, meme: gMeme })
    sroteDataInLocS(SAVED_KEY, gSavedMemes)
    onBackToGallery()
    onShowSavedMemes()
}


function _memeToHTML() {
    return `<img src="${gCanvas.toDataURL()}" onclick="onSavedMemeEdit(this.src)" class="img-galerry">`
}

function onSavedMemeEdit(src) {
    onImgSelect(src)
    
}