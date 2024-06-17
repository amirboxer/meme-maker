'use strict'

function renderGallery() {
    // let id = 1
    const elGallery = document.querySelector('.gallery')
    const uploadImg = `<img class="" src="style/images/icons/upload.png" onclick="onUpLoadImage()" title="Click To Upload Picture">`
    elGallery.innerHTML = uploadImg + gImgsSrcs.map(imgSrc => `<img class="img-gallery" src="${imgSrc}" onclick="onImgSelect(this.src)">`).join('')
}

function onImgSelect(imgSrc, clearCanvas=true) {
    document.querySelector('.gallery').style.display = 'none'
    const elMemeCreationPg = document.querySelector('.meme-creation-cover')
    elMemeCreationPg.style.display = "initial"
    setMemeImgSrc(imgSrc)
    resizeCanvas(clearCanvas)
}

function onShowSavedMemes() {
    const elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = ''
    _renderSavedMemes(elGallery)
}

function onBackToGallery() {
    const elMemeCreationPg = document.querySelector('.meme-creation-cover')
    elMemeCreationPg.style.display = "none"
    createMemeObj()
    document.querySelector('.gallery').style.display = 'initial'

}

function _renderSavedMemes(elGallery) {
    const memes = gSavedMemes.reduce((acc, sMeme) => acc + sMeme.html, '');
    elGallery.innerHTML = memes
}


function onOutOfFocusExitEdditor(ev, el) { // apllies to window
    if (ev.target !== el) return
    onBackToGallery()
}



