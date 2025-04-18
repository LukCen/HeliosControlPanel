"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/main.ts
var import_electron = require("electron");
var import_node_path = __toESM(require("node:path"));
var createWindow = () => {
  const win = new import_electron.BrowserWindow({
    width: 1600,
    height: 1200,
    frame: false,
    // hides the default title bar and controls
    titleBarStyle: "hidden",
    // for macOS, apparently
    webPreferences: {
      preload: import_node_path.default.join(__dirname, "./preload.js")
    }
  });
  win.setMenuBarVisibility(false);
  win.loadFile("../public/html/main.html");
};
import_electron.app.whenReady().then(() => {
  createWindow();
});
import_electron.ipcMain.on("defaultWindowControls", (e, payload) => {
  const win = import_electron.BrowserWindow.fromWebContents(e.sender);
  if (win) {
    switch (payload) {
      case "close":
        win.close();
        break;
      case "max":
        win.maximize();
        break;
      case "min":
        win.minimize();
    }
  }
});
import_electron.ipcMain.on("openNewSchemaWindow", (e) => {
  console.log("schema button pressed");
  const mainWin = import_electron.BrowserWindow.fromWebContents(e.sender);
  if (mainWin) {
    const schemaWin = new import_electron.BrowserWindow({
      width: 1200,
      height: 800,
      frame: false,
      // hides the default title bar and controls
      titleBarStyle: "hidden",
      // for macOS, apparently
      webPreferences: {
        preload: import_node_path.default.join(__dirname, "./preload.js")
      },
      parent: mainWin
    });
    schemaWin.setMenuBarVisibility(false);
    schemaWin.loadFile("../public/html/addSchema.html");
  }
});
