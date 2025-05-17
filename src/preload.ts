import { contextBridge, ipcRenderer } from "electron"



contextBridge.exposeInMainWorld('Main', {

  openAddConnectionWindow: () => ipcRenderer.send('openAddConnectionWindow'),
  fetchSchemaList: () => ipcRenderer.send('fetchSchemaList'), // returns the contents of schemas.json if not empty,



  // this is the one you want
  fetchSchemaListResponse: (callback: (data: object) => void) => ipcRenderer.on('fetchSchemaListResponse', (_, data) => callback(data)),
  pushConnection: () => ipcRenderer.send('pushConnection') //adds a new connection to the connection list
  ,
  pushConnectionItem: (cb: () => void) => ipcRenderer.on('pushConnectionItem', cb)
})
