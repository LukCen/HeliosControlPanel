
const fileUploader = document.querySelector('#send-file')
const selectedFileList = document.querySelector('.selected-file-list')
const btnSendFiles = document.querySelector('.--send-files')
const fileReader = new FileReader()
const btnServerSettings = document.querySelector('#btn-server-settings')
if (btnSendFiles) {
  btnSendFiles.addEventListener('click', () => {

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
      // console.log(`Promises resolved - button clicked`)
    }).catch(e => {
      console.error(`Error promise filling : ${e}`)
    })
  })

}

btnServerSettings.addEventListener('click', () => {
  images.serverSettingsOpen()
})
