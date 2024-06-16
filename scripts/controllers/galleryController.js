'use strict'

function renderGallery() {
    // let id = 1
    const elGallety = document.querySelector('.gallery')
    const uploadImg = `<img class="" src="../../style/images/icons/upload.png" onclick="onUpLoadImage()">`
    elGallety.innerHTML = uploadImg + gImgsSrcs.map(imgSrc => `<img class="" src="${imgSrc}" onclick="onImgSelect(this.src)">`).join('')
}

function onImgSelect(imgSrc) {
    setMemeImgSrc(imgSrc)
    renderMeme()

    const elMemeCreationPg = document.querySelector('.meme-creation-cover')
    elMemeCreationPg.style.display = "initial"
}

function onBackToGallery() {
    const elMemeCreationPg = document.querySelector('.meme-creation-cover')
    console.log()
    elMemeCreationPg.style.display = "none"
    clearMeme()

    // TODO clear canvas???
}