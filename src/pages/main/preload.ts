import { contextBridge, ipcRenderer } from "electron"

console.log('MAIN preload loaded')


contextBridge.exposeInMainWorld('Main', {
  // main menu navbar - topside of main window
  defaultWindowControls: (payload: string) => ipcRenderer.send('defaultWindowControls', payload),

  // schemas
  openNewSchemaWindow: () => ipcRenderer.send('openNewSchemaWindow'),
  /**
   * ESBuild specific workaround - lets you run node-specific functions in a file tagged for broswer environment
   * @param func Function to execute
   * @param args Additional arguments
   * @returns 
   */
  bridgeFunction: (contentToWrite: unknown) => ipcRenderer.send('bridgeFunction', contentToWrite),
  // add connections
  "connection:openWindow": () => ipcRenderer.send('openAddConnectionWindow'),
  fetchSchemaList: () => ipcRenderer.send('fetchSchemaList'), // returns the contents of schemas.json if not empty,



  // this is the one you want
  fetchSchemaListResponse: (callback: (data: object) => void) => ipcRenderer.on('fetchSchemaListResponse', (_, data) => callback(data)),
  pushConnection: () => ipcRenderer.send('pushConnection') //adds a new connection to the connection list
  ,
  pushConnectionItem: (cb: () => void) => ipcRenderer.on('pushConnectionItem', cb)
})
