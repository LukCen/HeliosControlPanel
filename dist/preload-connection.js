"use strict";

// src/pages/connection/preload.ts
var import_electron = require("electron");
import_electron.contextBridge.exposeInMainWorld("Connection", {
  // main menu navbar - topside of main window
  defaultWindowControls: (payload) => import_electron.ipcRenderer.send("defaultWindowControls", payload),
  "connection:openWindow": () => import_electron.ipcRenderer.send("openAddConnectionWindow"),
  "connection:fetchSchemaList": () => import_electron.ipcRenderer.send("fetchSchemaList"),
  // returns the contents of schemas.json if not empty,
  // this is the one you want
  "connection:fetchSchemaListResponse": (callback) => import_electron.ipcRenderer.on("fetchSchemaListResponse", (_, data) => callback(data)),
  "connection:pushConnection": () => import_electron.ipcRenderer.send("pushConnection"),
  "connection:pushConnectionItem": (cb) => import_electron.ipcRenderer.on("pushConnectionItem", cb)
});
