const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()
app.use(express.json())

let db = null

const CoVaccine = async () => {
  try {
    db = await open({
      filename: './covid19India.db',
      driver: sqlite3.Database,
    })
    console.log('DB connected successfully.')
    app.listen(3000, () => {
      console.log('server is running in http://localhost:3000')
    })
  } catch (e) {
    console.log(`DB:error ${e.message}`)
  }
}

CoVaccine()

app.get('/states/', async (req, res) => {
  const data = `SELECT * FROM state`
  const result = await db.all(data)
  res.send(result)
})

app.get('/states/:stateId/', async (req, res) => {
  const {stateId} = req.params
  const data = `SELECT *  from state where state_id =?`
  const result = await db.get(data, [stateId])
  res.send(result)
})

app.post('/districts/', async (req, res) => {
  const {districtName, stateId, cases, cured, active, deaths} = req.body
  const data = `INSERT into district(district_name,state_id,cases,cured,active,deaths) values(?,?,?,?,?,?)`
  const result = await db.run(data, [
    districtName,
    stateId,
    cases,
    cured,
    active,
    deaths,
  ])
  res.send('Post successfully')
})

app.get('/districts/:districtId/', async (req, res) => {
  const {districtId} = req.params
  const data = `select * from district where district_id=?`
  const result = await db.get(data, [districtId])
  res.send(result)
})

app.delete('/districts/:districtId/', async (req, res) => {
  const {districtId} = req.params
  const data = `delete from district where district_id =?`
  const result = await db.run(data, [districtId])
  res.send('Deleted successfully')
})

app.put('/districts/:districtId/', async (req, res) => {
  const {districtId} = req.params
  const {districtName, stateId, cases, cured, active, deaths} = req.body
  const data = `UPDATE district set district_name=?,state_id=? ,
  cases=?,cured=?,active=?,deaths=? where district_id=?`
  const result = await db.run(data, [
    districtName,
    stateId,
    cases,
    cured,
    active,
    deaths,
    districtId,
  ])
  res.send('Update successfull')
})

app.get('/states/:stateId/stats/', async (req, res) => {
  const {stateId} = req.params
  const data = `SELECT sum(cases),sum(cured),sum(active),sum(deaths) from district where state_id=?`
  const result = await db.get(data, [cases, cured, active, deaths, stateId])
  res.send(result)
})

app.get('/districts/:districtId/details/', async (request, response) => {
  const {districtId} = request.params
  const getDistrictIdQuery = `
    select state_id from district
    where district_id = ?;
    ` //With this we will get the state_id using district table
  const getDistrictIdQueryResponse = await database.get(getDistrictIdQuery, [
    districtId,
  ])
  const getStateNameQuery = `
    select state_name as stateName from state
    where state_id =?;
    ` //With this we will get state_name as stateName using the state_id
  const getStateNameQueryResponse = await database.get(getStateNameQuery, [
    getDistrictIdQueryResponse.state_id,
  ])
  response.send(getStateNameQueryResponse)
})
