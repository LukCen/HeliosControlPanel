"use strict";

// src/preload.ts
var import_electron = require("electron");
console.log("preload loaded");
import_electron.contextBridge.exposeInMainWorld("Main", {
  test: () => import_electron.ipcRenderer.send("test")
});
