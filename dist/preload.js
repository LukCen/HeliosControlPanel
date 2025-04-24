"use strict";

// src/preload.ts
var import_electron = require("electron");
console.log("preload loaded");
import_electron.contextBridge.exposeInMainWorld("Main", {
  // main menu navbar - topside of main window
  defaultWindowControls: (payload) => import_electron.ipcRenderer.send("defaultWindowControls", payload),
  // schemas
  openNewSchemaWindow: () => import_electron.ipcRenderer.send("openNewSchemaWindow"),
  /**
   * ESBuild specific workaround - lets you run node-specific functions in a file tagged for broswer environment
   * @param func Function to execute
   * @param args Additional arguments
   * @returns 
   */
  bridgeFunction: (contentToWrite) => import_electron.ipcRenderer.send("bridgeFunction", contentToWrite),
  // add connections
  openAddConnectionWindow: () => import_electron.ipcRenderer.send("openAddConnectionWindow"),
  fetchSchemaList: () => import_electron.ipcRenderer.send("fetchSchemaList"),
  // returns the contents of schemas.json if not empty
  // this is the one you want
  fetchSchemaListResponse: (callback) => import_electron.ipcRenderer.on("fetchSchemaListResponse", (_, data) => callback(data)),
  pushConnection: (content) => import_electron.ipcRenderer.send("pushConnection", content)
  //adds a new connection to the connection list
});
