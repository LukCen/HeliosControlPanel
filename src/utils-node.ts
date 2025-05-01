//-------------------------------------------------------------------------------------------------------------------------
import mysql2, { Connection } from 'mysql2/promise'
import express from 'express'
import cors from 'cors'
import { Server } from 'http'
import { accessSync, existsSync, PathLike, readFileSync, statSync, writeFile } from 'fs';
import { constants } from 'fs/promises';
import { SchemaBlock } from 'interface';



/**
 * Utility function to enable and simplify starting connections with external servers
 * Uses mysql2, cors and Express.js
 * 
 * @param {string} hostname - IP adress or name of the host machine
 * @param {string} username - name of the account logged onto the host
 * @param {string} password - password to connect to the host
 * @param {string} database  - name of the SQL database to access
*/
let db: Connection | null = null;
let server: Server;

export async function connectionStart(hostname: string, username: string, password: string, database: string): Promise<void> {
  const app = express()
  const port = 3000

  app.use(cors())
  app.use(express.json())

  // mysql database info used to connect - accessed from GUI
  db = await mysql2.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  })

  try {
    app.get(`/api/products`, async (req, res) => {
      try {
        if (!db) throw new Error(`Error in connectionStart try/catch - db is null or undefined`) // nullcheck so TS doesnt scream on me
        const [rows] = await db.query('SELECT * from products') // TODO: rewrite the endpoint later so it can be adjusted by the user
        res.json(rows)
      } catch (e: any) { // TODO - why is this of type 'any'...
        res.status(500).send(`Database connection error: ${e.message}`)
      }
    })
    server = app.listen(port, () => {
      console.log(`Server is running at http://${hostname}:${port}`)
    })
  } catch (e) {
    console.error(`An error with reaching an endpoint occured: ${e}`)
  }
}




// -------------------------------------------------------------------------------------------------------------------------
export function writeToFile(filePath: string, contents: object | string) {
  const currentFileSize = statSync(filePath).size // rozmiar obecnego pliku liczony w bitach - przy wyniku rownym 0 nie dodaje zawartosci do nowego pliku
  const currentFile: Buffer<ArrayBufferLike> = readFileSync(filePath) // content obecnego pliku - argument kodowania zmienia return value na string

  const jsonNewFile = [] // arrayka nowymi treściami w formacie JSON (stary + nowy content)
  if (currentFileSize === 0) {
    jsonNewFile.push(contents) // jesli plik jest pusty - dodaj tylko nową zawartość
  } else {

    jsonNewFile.push(...JSON.parse(currentFile.toString()), contents) // jeśli plik nie jest pusty - dodaj obecną zawartość + nową na koniec pliku
  }
  const contentToSave = JSON.stringify(jsonNewFile, null, 2)

  // funkcja dodająca content do pliku -
  // @filepath - sciezka do pliku, podawana w main.js,
  // @contentToSave - nowa zawartosc, definiowana powyzej
  writeFile(filePath, contentToSave, { mode: 0o644 }, e => {
    if (e) {
      console.error(e)
    } else {
      console.log('Zapis pliku powiodl sie.')
    }
  })
}


// -------------------------------------------------------------------------------------------------------------------------
export function writeToFileNew(filePath: string, newSchemas: SchemaBlock[]) {

  let finalSchemas: SchemaBlock[] = []

  try {
    const currentFileSize = statSync(filePath).size

    // check file size - if larger than zero, file not empty, read existing data, parse as array of SchemaBlocks, then append new content and replace the file content with it all
    // if file is empty, simply add the newly added schema
    if (currentFileSize > 0) {
      const existingData = JSON.parse(readFileSync(filePath, 'utf-8')) as SchemaBlock[]
      finalSchemas = [...existingData, ...newSchemas]
    } else {
      finalSchemas = [...newSchemas]
    }

    const contentToSave = JSON.stringify(finalSchemas, null, 2)
    writeFile(filePath, contentToSave, { mode: 0o644 }, e => {
      if (e) {
        console.error(e)
      } else {
        console.log('Zapis pliku powiodl sie.')
      }
    })
  }
  catch (e) {
    console.error
  }
}

// -------------------------------------------------------------------------------------------------------------------------
/**
 * Helper function to read contents from JS file and return the parsed contents
 * @param file - Path to the read file
 * @returns 
 */
export function readFromFile(file: PathLike): string[] | string | null {
  try {
    accessSync(file, constants.R_OK)
    console.log(`file accessible`)
    if (!existsSync(file)) return null // zabezpieczenie przez próbą zwrócenia pustego pliku

    const currentFileSize = statSync(file).size // rozmiar obecnego pliku liczony w bitach - przy wyniku rownym 0 nie dodaje zawartosci do nowego pliku
    if (currentFileSize === 0) return null

    const currentFile = readFileSync(file, "utf-8").trim() // obecne treści z pliku - nowe zostaną do nich dodane, jeśli plik nie jest pusty

    return JSON.parse(currentFile)

  } catch (e) {
    console.log('file unreadable')
    throw new Error(`Błąd ładowania pliku konfiguracyjnego : ${e}`)
  }
}
