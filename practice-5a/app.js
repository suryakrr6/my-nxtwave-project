const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()
app.use(express.json())

let db = null
const Movie = async () => {
  try {
    db = await open({
      filename: './moviesData.db',
      driver: sqlite3.Database,
    })
    console.log('DB connected Successfull')
    app.listen(3000, () => {
      console.log(`server is running at http://localhost:3000`)
    })
  } catch (error) {
    console.log(`DB:error ${error.message}`)
  }
}
Movie()

app.get('/movies/', async (req, res) => {
  const data = `SELECT movie_name FROM movie`
  const result = await db.all(data)

  const formatedData = result.map(each => ({
    movieName: each.movie_name,
  }))
  res.send(formatedData)
})

app.post('/movies/', async (req, res) => {
  const {directorId, movieName, leadActor} = req.body
  const data = `INSERT INTO movie(director_id,movie_name,lead_actor) values(?,?,?)`
  const result = await db.run(data, [directorId, movieName, leadActor])
  res.send('Movie Successfully Added')
})

app.get('/movies/:movieId/', async (req, res) => {
  const {movieId} = req.params
  const data = `SELECT * from movie where movie_id = ?`
  const result = await db.get(data, [movieId])
  res.send({
    movieId: result.movie_id,
    directorId: result.director_id,
    movieName: result.movie_name,
    leadActor: result.lead_actor,
  })
})

app.put('/movies/:movieId/', async (req, res) => {
  const {movieId} = req.params
  const {directorId, movieName, leadActor} = req.body
  const data = `UPDATE movie SET director_id=?,movie_name=?,lead_actor=? where movie_id=?`
  const result = await db.run(data, [directorId, movieName, leadActor, movieId])
  res.send('Movie Details Updated')
})

app.delete('/movies/:movieId/', async (req, res) => {
  const {movieId} = req.params
  const data = `DELETE FROM movie where movie_id = ?`
  const result = await db.run(data, [movieId])
  res.send('Movie Removed')
})

app.get('/directors/', async (req, res) => {
  const data = `select * from director`
  const result = await db.all(data)
  const formatedData = result.map(each => ({
    directorId: each.director_id,
    directorName: each.director_name,
  }))
  res.send(formatedData)
})

app.get('/directors/:directorId/movies/', async (req, res) => {
  const {directorId} = req.params
  const data = `SELECT movie_name from movie where director_id = ?`
  const result = await db.all(data, [directorId])
  res.send(
    result.map(each => ({
      movieName: each.movie_name,
    })),
  )
})

module.exports = app
