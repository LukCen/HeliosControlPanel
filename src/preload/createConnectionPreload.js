const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('connections', {
  createNewConnection: (hostname, username, password, database) => ipcRenderer.invoke('create-connection', hostname, username, password, database,),

  connectionStatus: (callback) => ipcRenderer.on('connection-status', (_event, message) => callback(message)),

})
