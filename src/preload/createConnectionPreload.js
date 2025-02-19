const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('connections', {
  createNewConnection: (hostname, username, password, database) => ipcRenderer.invoke('create-connection', hostname, username, password, database),
  sendConnectionData: (hostname, username, database, isSuccessful) => ipcRenderer.invoke('fetchData', hostname, username, database, isSuccessful),
  connectionStatus: (callback) => ipcRenderer.on('connection-status', (_event, message) => callback(message))
})
