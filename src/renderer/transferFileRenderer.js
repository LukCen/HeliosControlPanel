
const fileUploader = document.querySelector('#send-file')
const selectedFileList = document.querySelector('.selected-file-list')
const btnSendFiles = document.querySelector('.--send-files')
const fileReader = new FileReader()
// function listCurrentFiles() {
//   console.log(fileUploader.files)
//   // images.sendImages(fileUploader.files)
// }


// fileUploader.addEventListener('change', listCurrentFiles)
if (btnSendFiles) {
  btnSendFiles.addEventListener('click', () => {
    // const filesToUpload = fileUploader.files
    // images.sendImages(filesToUpload)
    // console.log('File send button clicked')
    // console.log(fileReader)
    const filesToUpload = Array.from(fileUploader.files)
    console.log(`Images array-fied`)
    const filePromises = filesToUpload.map(file => {
      return new Promise((res, rej) => {
        const reader = new FileReader()
        reader.onload = () => {
          res({
            name: file.name,
            content: reader.result.split(',')[1]
          })
        }
        reader.onerror = rej
        reader.readAsDataURL(file)
      })
    })
    console.log(`promise mapping complete`)
    Promise.all(filePromises).then(filesData => {
      images.sendImages(filesData)
      console.log(`Promises resolved - button clicked`)
    }).catch(e => {
      console.error(`Error promise filling : ${e}`)
    })
  })

}

