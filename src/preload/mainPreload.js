
const { contextBridge, ipcRenderer } = require('electron')
// import { contextBridge, ipcRenderer } from 'electron'
contextBridge.exposeInMainWorld('main', {
  createConnectionOpen: () => ipcRenderer.send('create-connection-window-open'),
  createConnectionClose: () => ipcRenderer.send('create-connection-window-close'),
  openConnectionList: () => ipcRenderer.send('display-connection'),
  fetchConnectionList: () => ipcRenderer.send('fetch-connection-list'),
  displayVersion: () => ipcRenderer.invoke('fetch-app-version')
})
