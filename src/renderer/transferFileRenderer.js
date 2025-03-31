
const fileUploader = document.querySelector('#send-file')
const selectedFileList = document.querySelector('.selected-file-list')
const btnSendFiles = document.querySelector('.--send-files')
const fileReader = new FileReader()

const assetName = document.querySelector('#asset-name') // dane polaczenia - nazwa hosta (IP/slowny)
const assetHost = document.querySelector('#asset-host') // dane polaczenia - nazwa konta administratora serwera
const assetPort = document.querySelector('#asset-port') // dane polaczenia - port
const assetUser = document.querySelector('#asset-user') // dane polaczenia - nazwa konta na ktorym postawiony jest serwer (na ktore jest zalogowany w systemie)
const assetPw = document.querySelector('#asset-pw') // haslo - nie powinno byc wyswietlane
const connContainer = document.querySelector('ul.--connections') // kontener zewnetrzny na pojedyncze polaczenia
const btnSaveConnection = document.querySelector('.--save') // przycisk 'dodaj do listy polaczen'

const configFilePath = 'connection_config.json' // nazwa pliku konfiguracyjnego - powinien znajdowac sie w root folderze

// pojedyncze polaczenie z serwerem zasobow
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
  }
  displayConnectionList(arr) {
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
  Connection.displayConnectionList(savedConnections)
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
