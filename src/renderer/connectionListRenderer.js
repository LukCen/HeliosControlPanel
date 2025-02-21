
const connectionListUl = document.querySelector('.connection-list')
const connectionListItem = document.createElement('li')
const connectionsBody = document.querySelector('tbody')
const parsingtest = connectionList.testing()
const isActive = connectionList.checkActiveConnectionStatus()
let connectionStatus = null;
const connectionsArray = []

isActive.then((e) => connectionStatus = e).then(() => {
  parsingtest.then((vals) => {

    connectionsArray.push(...vals)
  }).then(() => {

    connectionsArray.map((e) => {
      connectionsBody.innerHTML +=
        `<tr data-id='${e.id}'>
        <td>${e.id}</td>
        <td>${e.hostname}</td>
        <td>${e.username}</td>
        <td>${e.database}</td>
        <td>${connectionStatus}</td>
       <td><button data-id='${e.id}' class="btn --connection-remove">Remove</button></td>
      </tr>`

    })
    const btnRemoveConnection = document.querySelectorAll('.--connection-remove')
    btnRemoveConnection.forEach((b) => {
      b.addEventListener('click', () => {
        console.log(`button id ${b.dataset.id} clicked`)
        connectionList.stopConnection()
        b.closest('tr').remove()
      })
    })
  })
})




// console.log(connectionsArray)
// console.log(mapped)
