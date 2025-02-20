const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('connectionList', {
  openConnectionList: () => ipcRenderer.send('display-connection'),
  fetchConnectionInfo: () => ipcRenderer.send('request-connection-info'),
  testing: () => ipcRenderer.invoke('testing'),
  checkActiveConnectionStatus: () => ipcRenderer.invoke('check-active-connection')
})
