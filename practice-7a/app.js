const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()
app.use(express.json())

let db = null

const Cricket = async () => {
  try {
    db = await open({
      filename: './cricketMatchDetails.db',
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('server is running in http://localhost:3000')
    })
  } catch (e) {
    console.log(`DB:error ${e.message}`)
  }
}
Cricket()

app.get('/players/', async (req, res) => {
  const data = `select * from player_details`
  const result = await db.all(data)
  const formatedData = result.map(each => ({
    playerId: each.player_id,
    playerName: each.player_name,
  }))
  res.send(formatedData)
})

app.get('/players/:playerId/', async (req, res) => {
  const {playerId} = req.params
  const data = `select * from player_details where player_id=?`
  const result = await db.get(data, [playerId])
  res.send({
    playerId: result.player_id,
    playerName: result.player_name,
  })
})

app.put('/players/:playerId/', async (req, res) => {
  const {playerId} = req.params
  const {playerName} = req.body
  const data = `update player_details set player_name=? where player_id=?`
  const result = await db.run(data, [playerName, playerId])

  res.send('Player Details Updated')
})

app.get('/matches/:matchId/', async (req, res) => {
  const {matchId} = req.params
  const data = `select * from match_details where match_id=?`
  const result = await db.get(data, [matchId])
  res.send({
    matchId: result.match_id,
    match: result.match,
    year: result.year,
  })
})

app.get('/players/:playerId/matches', async (req, res) => {
  const {playerId} = req.params
  const data = `select match_id,match,year 
  from match_details natural join player_match_score where player_id =?`
  const result = await db.all(data, [playerId])
  res.send({
    result,
  })
})
