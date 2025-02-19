import { BrowserWindow } from "electron"
import path from 'path'
import { fileURLToPath } from 'url'



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const createWindow = (width = 800, height = 600, winFile = '', pathToPreload) => {
  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, '..', ...pathToPreload)
    }
  })

  win.loadFile(winFile)
  // console.log(`Preload path: ${path.join(__dirname, '..', ...pathToPreload)}`)
  // console.log('new window created')
}
export { createWindow }
