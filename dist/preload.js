"use strict";

// src/preload.ts
var import_electron = require("electron");
console.log("preload loaded");
import_electron.contextBridge.exposeInMainWorld("Main", {
  // main menu navbar - topside of main window
  defaultWindowControls: (payload) => import_electron.ipcRenderer.send("defaultWindowControls", payload),
  // schemas
  openNewSchemaWindow: () => import_electron.ipcRenderer.send("openNewSchemaWindow")
});
