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
    gMeme.id = getRandomIntInclusive(1, 1000000)
    gMeme.originalSrc = getMemeImgSrc()
    const memeHTML = _memeToHTML(gMeme)
    gSavedMemes.unshift({ html: memeHTML, meme: gMeme })
    sroteDataInLocS(SAVED_KEY, gSavedMemes)
    onBackToGallery()
    onShowSavedMemes()
}


function _memeToHTML() {
    return `<img src="${gCanvas.toDataURL()}" onclick="onSavedMemeEdit(this)" class="img-galerry" data-id="${gMeme.id}">`
}

function onSavedMemeEdit(elImg) {
    gMeme = findMemeInSavedMems(+elImg.getAttribute('data-id'))
    onImgSelect(gMeme.originalSrc)
}

function findMemeInSavedMems(memeId) {
    for (var i = 0; i < gSavedMemes.length; ++i) {
    }
    return gSavedMemes.find(saved => saved.meme.id === memeId).meme
}