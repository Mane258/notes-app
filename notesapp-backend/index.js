// configurin server

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3002
const db = require('./queries')

// applying cors and bodyparser to use

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// telling server what to do when a request at the given endpoint is called.

app.get('/', (request, response) => {
  response.json({ info: 'Hello' })
})
app.get('/notes', db.getNotes)
app.post('/notes', db.createNote)
app.put('/notes/:id', db.updateNote)
app.delete('/notes/:id', db.deleteNote)

// server listening port and a console.log

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

