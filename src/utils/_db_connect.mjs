import mysql2 from 'mysql2/promise'
import express from 'express'
import cors from 'cors'


let db = null
let server = null

export async function connectionStart(hostname, username, password, database) {
  const app = express()
  const port = 3000
  //  middleware
  app.use(cors())
  app.use(express.json())

  // dane bazy mysql z ktora sie laczymy - ciagniete przez GUI ze strony createConnection
  db = await mysql2.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  })

  // endpoint
  try {
    app.get(`/api/products`, async (req, res) => {

      try {
        // nie pamiętam co ta funkcja robi więc póki co zostawię - chyba wszystko działa więc, wygląda na to że to jakaś pozostałość po testach
        // await showAllTables()


        const [rows] = await db.query('SELECT * FROM products') // tutaj wpisz zapytanie MySQL jakie chcesz wykonać
        res.json(rows)
        // console.log('new connection established!')
        isActive = true;

        messageText = `Connection with ${database} at ${hostname} established successfully`

      } catch (e) {
        res.status(500).send(`DB error: ${e.message}`)
        messageText = `An error has occured : ${e.message}`
      }

    })

    // backend
    server = app.listen(port, () => {
      console.log(`Server running at http://${hostname}:${port}`);
    });

  } catch (e) {
    console.error(e)

  }
}
export async function checkConnectionStatus() {
  try {
    await db.ping()
    console.log('checkConnectionStatus - ACTIVE')
    return true
  } catch (e) {
    return false
  }
}

export async function closeConnection() {
  if (db) {
    await db.end()
    console.log(`Database connection closed successfully.`)
  }
  if (server) {
    server.close(() => {
      console.log('Server connection closed.')
    })
  }
  console.log('closeConnection tapped')
}
