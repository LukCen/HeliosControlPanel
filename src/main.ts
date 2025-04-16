import { app, BrowserWindow, ipcMain } from "electron"
import path from 'node:path'



const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),

    }
  })
  win.setMenuBarVisibility(false)
  win.loadFile('../public/html/index.html')
}

app.whenReady().then(() => {
  createWindow()
})

ipcMain.on('windowClose', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (win) {
    win.close()
  }
})

ipcMain.on('windowMaximize', (e) => {
  const win = BrowserWindow.fromWebContents(e.sender)
  if (win) {
    win.maximize()
  }
})

ipcMain.on('windowMinimize', (e) => {
  const win = BrowserWindow.fromWebContents(e.sender)
  if (win) {
    win.minimize()
  }
})
