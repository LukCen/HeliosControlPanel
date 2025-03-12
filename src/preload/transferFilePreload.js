const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('images', {
  attemptConnection: () => ipcRenderer.send('attempt-connection'),
  sendImages: (contents) => ipcRenderer.send('send-images', contents),
  serverSettingsOpen: () => ipcRenderer.send('server-settings-open'),
  appendConnectionList: (args) => ipcRenderer.send('append', args)
})
