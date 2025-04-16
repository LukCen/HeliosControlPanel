import { contextBridge, ipcRenderer } from "electron"

console.log('preload loaded')


contextBridge.exposeInMainWorld('Main', {
  test: () => ipcRenderer.send('test')
})
