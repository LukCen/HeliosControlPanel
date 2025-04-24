import { contextBridge, ipcRenderer } from "electron"

console.log('preload loaded')


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
  openAddConnectionWindow: () => ipcRenderer.send('openAddConnectionWindow'),
  fetchSchemaList: () => ipcRenderer.send('fetchSchemaList'), // returns the contents of schemas.json if not empty
  pushConnection: (content: object | string) => ipcRenderer.send('pushConnection', content) //adds a new connection to the connection list
})
