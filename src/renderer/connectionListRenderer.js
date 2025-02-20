
const connectionListUl = document.querySelector('.connection-list')
const connectionListItem = document.createElement('li')
const connectionsHeader = document.querySelector('thead')
const parsingtest = connectionList.testing()
const isActive = connectionList.checkActiveConnectionStatus()
let connectionStatus = null;
const connectionsArray = []

isActive.then((e) => connectionStatus = e).then(() => {
  parsingtest.then((vals) => {

    connectionsArray.push(...vals)
  }).then(() => {

    connectionsArray.map((e) => {
      connectionsHeader.innerHTML +=
        `<tr>
        <td>${e.id}</td>
        <td>${e.hostname}</td>
        <td>${e.username}</td>
        <td>${e.database}</td>
        <td>${connectionStatus}</td>
      </tr>`
    })
  })

})




// console.log(connectionsArray)
// console.log(mapped)
