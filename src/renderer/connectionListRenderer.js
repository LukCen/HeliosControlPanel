
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
        <td name="status" class="connection-status">${connectionStatus}</td>
        <td>
          <button data-id='${e.id}' class="btn --connection-shutdown">Zamknij</button>
          <button data-id='${e.id}' class="btn --connection-remove">Usuń</button>
        </td>
      </tr>`

    })
    const btnRemoveConnection = document.querySelectorAll('.--connection-shutdown')
    btnRemoveConnection.forEach((b) => {
      b.addEventListener('click', () => {
        const thisRow = b.closest('tr')
        // console.log(`button id ${b.dataset.id} clicked, parent: ${b.closest('tr')}`)
        // thisStatus.text = false
        // console.log(typeof thisRow.childNodes.item(9).textContent)
        thisRow.childNodes.item(9).textContent = false
        connectionList.stopConnection()


      })
    })
  })

})




// console.log(connectionsArray)
// console.log(mapped)
