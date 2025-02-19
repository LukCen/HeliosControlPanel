const btnAttemptConnection = document.querySelector('#button-connect')


btnAttemptConnection.addEventListener('click', () => {
  const msg = document.querySelector('.connections-feedback-msg')
  const hostname = document.querySelector('#hostname')?.value
  const username = document.querySelector('#username')?.value
  const password = document.querySelector('#password')?.value
  const database = document.querySelector('#database')?.value
  connections.createNewConnection(hostname, username, password, database)
  connections.connectionStatus((message) => {
    // console.log('connectionStatus fired')
    console.log(`message: ${message}`)
    msg.innerText = message
  })
  console.log('connection created')
})
