import { app, BrowserWindow, ipcMain } from "electron"
import path from 'node:path'
import { writeToFile } from "utils-node"




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

ipcMain.on('bridgeFunction', () => {
  const pathToFile = path.join(__dirname, '../schemas.json')
  writeToFile(pathToFile, 'test')

})
