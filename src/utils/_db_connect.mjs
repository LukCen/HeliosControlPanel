import mysql2 from 'mysql2/promise'
import express from 'express'
import cors from 'cors'

export async function connectionStart(hostname, username, password, database) {
  const app = express()
  const port = 3000
  //  middleware
  app.use(cors())
  app.use(express.json())

  const db = await mysql2.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  })

  // endpoint
  try {
    app.get(`/api/products`, async (req, res) => {
      try {
        const [rows] = await db.query('SELECT * FROM products')
        res.json(rows)
        // console.log('new connection established!')
        messageText = `Connection with ${database} at ${hostname} established successfully`

      } catch (e) {
        res.status(500).send(`DB error: ${e.message}`)
        messageText = `An error has occured : ${e.message}`

      }

    })

    // backend
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });

  } catch (e) {
    console.error(e)

  }

}
