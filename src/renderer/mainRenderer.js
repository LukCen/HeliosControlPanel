
const btnCreateConnection = document.querySelector('button#createConnection')

const appVer = document.querySelector('.version')


// open window with connection data form
btnCreateConnection.addEventListener('click', () => {
  main.createConnectionOpen()
})


main.displayVersion().then(v => {
  appVer.innerText = v
}).catch(e => {
  throw new Error(e)
})

const btnConnectionList = document.querySelector('#connectionList')
const btnTransferFile = document.querySelector('#transferFile')
btnConnectionList.addEventListener('click', () => {
  console.log('con list open')
  main.openConnectionList()
  main.fetchConnectionList()
})


btnTransferFile.addEventListener('click', () => {
  main.transferFileOpen()
})
