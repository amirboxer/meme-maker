'use strict'

function renderGallery() {
    // let id = 1
    const elGallety = document.querySelector('.gallery')
    elGallety.innerHTML = gImgsSrcs.map(imgSrc => `<img src="${imgSrc}" onclick="onImgSelect(this.src)">`).join('')
}


function onImgSelect(imgSrc) {
    setMemeImgSrc(imgSrc)
    renderMeme()
}
