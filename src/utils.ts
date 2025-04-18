
//-------------------------------------------------------------------------------------------------------------------------
import mysql2, { Connection } from 'mysql2/promise'
import express from 'express'
import cors from 'cors'
import { Server } from 'http'


let db: Connection | null = null;
let server: Server;
/**
 * Utility function to enable and simplify starting connections with external servers
 * Uses mysql2, cors and Express.js
 * 
 * @param {string} hostname - IP adress or name of the host machine
 * @param {string} username - name of the account logged onto the host
 * @param {string} password - password to connect to the host
 * @param {string} database  - name of the SQL database to access
 */

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

//-------------------------------------------------------------------------------------------------------------------------
export async function checkConnectionStatus(): Promise<boolean> {
  try {
    if (!db) throw new Error(`Error in checkConnectionStatus - db is null or undefined`)
    await db?.ping()
    console.log(`checking connections...`)
    return true
  } catch (e) {
    console.error(`Connection status error : ${e}`)
    return false
  }
}

export async function closeConnection(): Promise<void> {
  if (db) {
    await db.end()
    console.log(`Connection closed successfully`)
  }
}

// Predefined color object
const colors: Record<string, number> = {
  red: 9,
  green: 10,
  blue: 12,
  yellow: 11,
  magenta: 13,
  cyan: 14,
  white: 15,
  black: 0,
  grey: 234, // dark grey
  mint: 49,  // mint green
};

/**
 * Quick and dirty way to color your terminal console logs.
 * Works in the bash terminal, should work in the browser console as well.
 * @param {string} text - contents of your message
 * @param {string} colorName - color your message will have, based on the following list: <br>
 * - red
 * - green
 * - blue
 * - yellow
 * - magenta
 * - cyan
 * - white
 * - black
 * - grey
 * - mint
 *
 * Can be viewed and modified inside src/utils/utils.ts
 */
export function colorLog(text: string, colorName: string) {
  const colorCode = colors[colorName];
  if (colorCode !== undefined) {
    const color = `\x1b[38;5;${colorCode}m`;
    const reset = '\x1b[0m';
    console.log(`${color}${text}${reset}`);
  } else {
    console.log('Color not found!');
  }
}
