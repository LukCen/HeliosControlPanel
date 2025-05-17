import { contextBridge, ipcRenderer } from "electron"



contextBridge.exposeInMainWorld('Connection', {
  // main menu navbar - topside of main window
  defaultWindowControls: (payload: string) => ipcRenderer.send('defaultWindowControls', payload),
  "connection:openWindow": () => ipcRenderer.send('openAddConnectionWindow'),
  "connection:fetchSchemaList": () => ipcRenderer.send('fetchSchemaList'), // returns the contents of schemas.json if not empty,
  // this is the one you want
  "connection:fetchSchemaListResponse": (callback: (data: object) => void) => ipcRenderer.on('fetchSchemaListResponse', (_, data) => callback(data)),
  "connection:pushConnection": () => ipcRenderer.send('pushConnection') //adds a new connection to the connection list
  ,
  "connection:pushConnectionItem": (cb: () => void) => ipcRenderer.on('pushConnectionItem', cb)
})
