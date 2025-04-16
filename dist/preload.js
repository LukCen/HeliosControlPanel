"use strict";

// src/preload.ts
var import_electron = require("electron");
console.log("preload loaded");
import_electron.contextBridge.exposeInMainWorld("Main", {
  // main menu navbar - topside of main window
  windowClose: () => import_electron.ipcRenderer.send("windowClose"),
  windowMaximize: () => import_electron.ipcRenderer.send("windowMaximize"),
  windowMinimize: () => import_electron.ipcRenderer.send("windowMinimize"),
  defaultWindowControls: (payload) => import_electron.ipcRenderer.send("defaultWindowControls", payload)
});
