import { contextBridge, ipcRenderer } from "electron"

console.log('MAIN preload loaded')


contextBridge.exposeInMainWorld('Schema', {
  // main menu navbar - topside of main window
  defaultWindowControls: (payload: string) => ipcRenderer.send('defaultWindowControls', payload),
  "schema:writeToFile": (contentToWrite: unknown) => ipcRenderer.send('schema:writeToFile', contentToWrite),
})
