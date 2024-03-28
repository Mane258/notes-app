require('dotenv').config()

// database info

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
})

// database query for getting all notes

const getNotes = (request, response) => {
  const getQuery = 'SELECT * FROM notes ORDER BY id ASC'
  pool.query(getQuery, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// database query for creating a new note

const createNote = (request, response) => {
  const { note } = request.body
  const createQuery = 'INSERT INTO notes (note) VALUES ($1)'

  pool.query(createQuery, [note], (error, results) => {
  if (error) {
      throw error
    }
    response.status(201).send(`Note added with ID: ${results.insertId}`)
  })
}

// database query for deleting a note

const deleteNote = (request, response) => {
  const id = parseInt(request.params.id)
  const deleteQuery = 'DELETE FROM notes WHERE id = $1'

  pool.query(deleteQuery, [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Note deleted with ID: ${id}`)
  })
}

// database query for updating an existing note

const updateNote = (request, response) => {
  const id = parseInt(request.params.id)
  const { note } = request.body
  const updateQuery = 'UPDATE notes SET note = $1 WHERE id = $2'

  pool.query(
    updateQuery, [note, id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Note modified with ID: ${id}`)
    }
  )
}

// exporting modules

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
}