const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()
app.use(express.json())

let db = null

const initializeDbandServer = async () => {
  try {
    db = await open({
      filename: './cricketTeam.db',
      driver: sqlite3.Database,
    })
    console.log('DB connected successfully')
    // app.listen(3000, () => {
    //   console.log('server is running at http://localhost:3000/')
    // })
  } catch (error) {
    console.log(`DB error: ${error.message}`)
    process.exit(1)
  }
}
initializeDbandServer()

app.get('/players/', async (req, res) => {
  const data = `SELECT * FROM cricket_team`
  const result = await db.all(data)

  const formatted = result.map(each => ({
    playerId: each.player_id,
    playerName: each.player_name,
    jerseyNumber: each.jersey_number,
    role: each.role,
  }))

  res.send(formatted)
})

app.get('/players/:playerId/', async (req, res) => {
  const {playerId} = req.params
  const data = `SELECT * FROM cricket_team where player_id = ?`
  const result = await db.get(data, [playerId])

  res.send({
    playerId: result.player_id,
    playerName: result.player_name,
    jerseyNumber: result.jersey_number,
    role: result.role,
  })
})

app.post('/players/', async (req, res) => {
  const {playerName, jerseyNumber, role} = req.body
  const data = `INSERT INTO cricket_team(player_name,jersey_number,role) values (?,?,?)`
  const result = await db.run(data, [playerName, jerseyNumber, role])
  res.send('Player Added to Team')
})

app.put('/players/:playerId/', async (req, res) => {
  const {playerId} = req.params
  const {playerName, jerseyNumber, role} = req.body
  const data = `UPDATE cricket_team
    SET player_name = ?, jersey_number = ?, role = ?
    WHERE player_id = ?`
  const result = await db.run(data, [playerName, jerseyNumber, role, playerId])
  res.send('Player Details Updated')
})

app.delete('/players/:playerId/', async (req, res) => {
  const {playerId} = req.params
  const data = `DELETE FROM cricket_team where player_id = ?`
  const result = await db.run(data, [playerId])
  res.send('Player Removed')
})

module.exports = app
