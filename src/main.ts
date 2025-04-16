import { app, BrowserWindow, ipcMain } from "electron"
import path from 'node:path'


const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      preload: path.join(__dirname, './preload.js')
    }
  })
  win.loadFile('../public/html/index.html')
}

app.whenReady().then(() => {
  createWindow()
})

ipcMain.on('test', () => {

})
