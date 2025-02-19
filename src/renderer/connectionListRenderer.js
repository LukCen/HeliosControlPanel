
const connectionListUl = document.querySelector('.connection-list')
const connectionListItem = document.createElement('li')
const connectionsHeader = document.querySelector('thead')
const parsingtest = connectionList.testing()
const connectionsArray = []
parsingtest.then((vals) => {
  // for (let i = 0; i < vals.length; i++) {
  //   const tr = document.createElement('tr')
  //   console.log(...vals)
  //   // connectionListItem.innerText = `Host: ${vals[i].hostname} | Nazwa: ${vals[i].username} | Serwer: ${vals[i].database}`
  //   // connectionListUl.append(connectionListItem)
  // }
  connectionsArray.push(...vals)
}).then(() => {
  connectionsArray.map((e) => {
    connectionsHeader.innerHTML +=
      `<tr>
      <td>${e.id}</td>
      <td>${e.hostname}</td>
      <td>${e.username}</td>
      <td>${e.database}</td>
    </tr>`
  })
})


// console.log(connectionsArray)
// console.log(mapped)
