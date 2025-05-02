import { app, BrowserWindow, ipcMain } from "electron"
import path from 'node:path'
import { colorLog } from "utils-dom"
import { readFromFile, writeToFileNew } from "utils-node"




const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 1200,
    frame: false, // hides the default title bar and controls
    titleBarStyle: 'hidden', // for macOS, apparently
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
    }
  })
  win.setMenuBarVisibility(false)
  win.loadFile('../public/html/main.html')
}


app.whenReady().then(() => {
  createWindow()
})

ipcMain.on('defaultWindowControls', (e, payload) => {
  const win = BrowserWindow.fromWebContents(e.sender)
  if (win) {
    switch (payload) {
      case "close":
        win.close();
        break
      case "max":
        win.maximize()
        break
      case "min":
        win.minimize()
    }
  }
})

// schema

ipcMain.on('openNewSchemaWindow', (e) => {
  console.log('schema button pressed')
  const mainWin = BrowserWindow.fromWebContents(e.sender)
  if (mainWin) {
    const schemaWin = new BrowserWindow({
      width: 1200,
      height: 800,
      frame: false, // hides the default title bar and controls
      titleBarStyle: 'hidden', // for macOS, apparently
      webPreferences: {
        preload: path.join(__dirname, './preload.js'),
      },
      parent: mainWin
    })
    schemaWin.setMenuBarVisibility(false)
    schemaWin.loadFile('../public/html/addSchema.html')
  }
})

// add connection
ipcMain.on('openAddConnectionWindow', (e) => {
  const mainWin = BrowserWindow.fromWebContents(e.sender)
  if (mainWin) {
    const addConnectionWin = new BrowserWindow({
      width: 1200,
      height: 800,
      frame: false, // hides the default title bar and controls
      titleBarStyle: 'hidden', // for macOS, apparently
      webPreferences: {
        preload: path.join(__dirname, './preload.js'),
      },
      parent: mainWin
    })
    addConnectionWin.setMenuBarVisibility(false)
    addConnectionWin.loadFile('../public/html/addConnection.html')

  }

})

ipcMain.on('bridgeFunction', (e, content) => {
  const pathToFile = path.join(__dirname, '../schemas.json')
  writeToFileNew(pathToFile, content)
})

ipcMain.on('fetchSchemaList', (e) => {
  const pathToFile = path.join(__dirname, '../schemas.json')
  // colorLog('schemas.json contents below', 'cyan')
  // console.dir(readFromFile(pathToFile), { depth: null })
  const response = readFromFile(pathToFile)
  colorLog('response logged in the fetchSchemaList binding', 'cyan')
  if (response) {
    console.log(response)
  }
  e.sender.send('fetchSchemaListResponse', (response))
})
