import { BrowserWindow } from "electron"
import path from 'path'
import { fileURLToPath } from 'url'



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const createWindow = (width = 800, height = 600, winFile = '', pathToPreload = '', parent = null) => {
  // okno główne
  if (parent === null) {
    const win = new BrowserWindow({
      width: width,
      height: height,
      webPreferences: {
        preload: path.join(__dirname, '..', ...pathToPreload)
      }
    })
    win.loadFile(winFile)
  } else {
    // okno dziecko - tworzone przy dodanym argumencie 'parent'
    const win = new BrowserWindow({
      width: width,
      height: height,
      webPreferences: {
        preload: path.join(__dirname, '..', ...pathToPreload)
      },
      parent: parent
    })
    win.loadFile(winFile)
  }

}
export { createWindow }
