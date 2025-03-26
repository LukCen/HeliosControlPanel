
import { app, BrowserWindow, ipcMain } from 'electron'
import { createWindow } from './utils/createWindow.js'
import { connectionStart, checkConnectionStatus, closeConnection } from './utils/_db_connect.mjs'
import { transferFiles } from './utils/fileTransfer.mjs'
import { writeToFile } from './utils/writeToFile.mjs'
import path from "node:path"
import { fileURLToPath } from 'url'

// z jakiegos powodu srodowiskowa z node nie dziala wiec robie takie durne obejscie

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// html files

const activeConnections = [] // zmienna ogólna, istotna dla okna connectionList

const activeWindows = []

let highestConnectionId = 0 // zmienna dla okna connectionList

function addNewConnection(id, hostname, username, database) {
  highestConnectionId++
  return { id, hostname, username, database }
}
const winPaths = {
  main: 'public/html/index.html',
  createConnection: 'public/html/createConnection.html',
  connectionList: 'public/html/connectionList.html',
  transferFile: 'public/html/transferFile.html',
  assets: 'public/html/assetServerSettings.html'
}

app.whenReady().then(() => {
  createWindow(1600, 1200, winPaths.main, ['preload', 'mainPreload.js'])
})


// close app when all windows closed

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit() }
})

// display current version from package.json
ipcMain.handle('fetch-app-version', (e) => {
  return app.getVersion()
})


// open connection window
ipcMain.on('create-connection-window-open', (e) => {
  createWindow(1200, 800, winPaths.createConnection, ['preload', 'createConnectionPreload.js'])
})

// connect to database
ipcMain.handle('create-connection', async (e, hostname, username, password, database) => {
  console.log('creating connection...')
  const win = BrowserWindow.getFocusedWindow()
  // console.log(win)
  try {
    await connectionStart(hostname, username, password, database, win)
    await checkConnectionStatus()
    win.webContents.send('connection-status', `Connection with '${hostname}' successful.`)

    activeConnections.push(addNewConnection(highestConnectionId, hostname, username, database))
  } catch (e) {
    win.webContents.send('connection-status', `Connection failed. Check the console for details.`)
    throw new Error(`An error has occured: ${e}`)
  }
})
// display a window with current connections
ipcMain.on('display-connection', (e) => {
  createWindow(1200, 768, winPaths.connectionList, ['preload', 'connectionListPreload.js'])
})
async function getCurrentConnections() {
  return [...activeConnections]
}
ipcMain.on('request-connection-info', (e) => {
  const requestingWindow = BrowserWindow.getFocusedWindow()
  requestingWindow.webContents.send(...activeConnections)
})

ipcMain.handle('testing', getCurrentConnections)
ipcMain.handle('check-active-connection', () => { return checkConnectionStatus() })
ipcMain.handle('stop-connection', closeConnection)


// image server

ipcMain.on('transfer-file-open', (e) => {
  createWindow(1200, 768, winPaths.transferFile, ['preload', 'transferFilePreload.js'])
})


ipcMain.on('send-images', async (e, contents) => {
  console.log('contents below - main.js')
  // console.log(contents)
  await transferFiles(contents)
})

ipcMain.on('server-settings-open', (e) => {
  createWindow(1200, 768, winPaths.assets, ['preload', 'assetServerSettingsPreload.js'])
})

ipcMain.on('append', (e, args) => {
  console.log('append method on connectionList fired')
})

ipcMain.on('writeToConfigFile', ((e, filePath, contents) => {
  const compositeFilePath = path.join(__dirname, "../", filePath)
  writeToFile(compositeFilePath, contents)
  console.log('---------------------- MAIN -----------------')
  console.log(`filePath: ${compositeFilePath}, contents: ${contents}`)
}))
