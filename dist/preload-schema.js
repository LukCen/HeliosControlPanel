"use strict";

// src/pages/schema/preload.ts
var import_electron = require("electron");
console.log("MAIN preload loaded");
import_electron.contextBridge.exposeInMainWorld("Schema", {
  // main menu navbar - topside of main window
  defaultWindowControls: (payload) => import_electron.ipcRenderer.send("defaultWindowControls", payload),
  "schema:writeToFile": (contentToWrite) => import_electron.ipcRenderer.send("schema:writeToFile", contentToWrite)
});
