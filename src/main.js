
import { app, BrowserWindow, ipcMain } from 'electron'
import { createWindow } from './utils/createWindow.js'
import { connectionStart, checkConnectionStatus, closeConnection } from './utils/_db_connect.mjs'

// html files

const activeConnections = []
let highestConnectionId = 0
function addNewConnection(id, hostname, username, database) {
  highestConnectionId++
  return { id, hostname, username, database }
}
const winPaths = {
  main: 'public/html/index.html',
  createConnection: 'public/html/createConnection.html',
  connectionList: 'public/html/connectionList.html'
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
