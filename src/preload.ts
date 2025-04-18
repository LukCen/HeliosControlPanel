import { contextBridge, ipcRenderer } from "electron"

console.log('preload loaded')


contextBridge.exposeInMainWorld('Main', {
  // main menu navbar - topside of main window
  defaultWindowControls: (payload: string) => ipcRenderer.send('defaultWindowControls', payload),

  // schemas
  openNewSchemaWindow: () => ipcRenderer.send('openNewSchemaWindow')
})
