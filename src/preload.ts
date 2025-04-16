import { contextBridge, ipcRenderer } from "electron"

console.log('preload loaded')


contextBridge.exposeInMainWorld('Main', {
  // main menu navbar - topside of main window
  windowClose: () => ipcRenderer.send('windowClose'),
  windowMaximize: () => ipcRenderer.send('windowMaximize'),
  windowMinimize: () => ipcRenderer.send('windowMinimize'),
  defaultWindowControls: (payload: string) => ipcRenderer.send('defaultWindowControls', payload)
})
