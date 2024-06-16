'use strict'

function onDownload() {
    const imgContent = gCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    _download(imgContent)
}

function _download(url) {
    const elA = document.createElement('a')
    elA.href = url
    elA.download = url.split('/').pop()
    document.body.appendChild(elA)
    elA.click()
    document.body.removeChild(elA)
  }

  function onUpLoadImage() {
    const elInput = document.createElement('input')
    elInput.type = 'file'
    elInput.accept="image/*"
    document.body.appendChild(elInput)
    elInput.onchange = event => onImgInput(event)
    elInput.click()
    document.body.removeChild(elInput)
  }

function onImgInput(ev) {
    loadImageFromInput(ev, onImgSelect)
}

// Read the file from the input
// When done send the image to the callback function
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        // let elImg = new Image()
        let src = event.target.result
        onImageReady(src)
    }
    reader.readAsDataURL(ev.target.files[0])
}
