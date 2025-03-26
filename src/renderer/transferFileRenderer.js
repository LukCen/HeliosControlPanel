
const fileUploader = document.querySelector('#send-file')
const selectedFileList = document.querySelector('.selected-file-list')
const btnSendFiles = document.querySelector('.--send-files')
const fileReader = new FileReader()

const assetName = document.querySelector('#asset-name')
const assetHost = document.querySelector('#asset-host')
const assetPort = document.querySelector('#asset-port')
const assetUser = document.querySelector('#asset-user')
const assetPw = document.querySelector('#asset-pw')
const connContainer = document.querySelector('ul.--connections')
const btnSaveConnection = document.querySelector('.--save')

const configFilePath = 'connection_config.json'

class AssetServer {
  constructor(host, port, user, pw) {
    this.id = null,
      this.host = host,
      this.port = port,
      this.user = user,
      this.pw = pw
  }
  saveConnection(arr) {
    this.id = arr.length + 1
    arr.push(this)
    // console.log(`createConnectionItem return block triggered`)
  }
  getConnectionList(arr) {
    const listItem = document.createElement('li')
    for (let i = 0; i < arr.length; i++) {
      const itemParam = arr[i]
      console.log('-----------------------------')
      console.log(itemParam)
      const itemId = document.createElement('div')
      const itemHost = document.createElement('div')
      const itemUser = document.createElement('div')
      const itemPort = document.createElement('div')
      const itemCells = [itemId, itemHost, itemUser, itemPort]
      listItem.classList.add('connection-list')
      itemCells.forEach((e) => e.classList.add('connectionInfoItemCell'))

      listItem.innerText = `${itemParam.id} - ${itemParam.host} - ${itemParam.user}`
      connContainer.appendChild(listItem)
      // console.log(listItem)
    }
  }
}

const savedConnections = [] // lista zapisanych połączeń - umożliwia odpalenie jakiegoś bez konieczności ręcznego wpisywania danych


btnSaveConnection.addEventListener('click', () => {
  const Connection = new AssetServer(assetHost.value, assetPort.value, assetUser.value, assetPw.value)
  Connection.saveConnection(savedConnections)
  Connection.getConnectionList(savedConnections)
  // const jsonifyConnection = JSON.stringify(Connection)
  images.writeToConfigFile(configFilePath, Connection)
  console.log('transferFileRenderer - writeToConfig fired')
})



// przesyłanie pliku do modułu fileTransfer.mjs
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
