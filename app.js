const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const bcrypt = require('bcrypt')

const app = express()

const app = express()
app.use(express.json())

let db = null

const initializeServer = async () => {
  try {
    db = await open({
      filename: 'userData.db',
      driver: sqlite3.Database,
    })
    console.log('DB Connected successfully')
    // app.listen(3000, () => {
    //   console.log('Server is running at http://localhost:3000/')
    // })
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

initializeServer()

app.post('/register', async (req, res) => {
  const {username, name, password, gender, location} = req.body
  const sqlquery = `select * from user where username =?`
  const Isqlquery = await db.get(sqlquery, [username])
  if (password.length < 5) {
    res.status(400).send('Password is too short')
  }
  const hashpassword = await bcrypt.hash(password, 10)
  if (Isqlquery === undefined) {
    const Iquery = `insert into user (username,name,password,gender,location) values(?,?,?,?,?);`
    const dbquery = await db.run(Iquery, [
      username,
      name,
      hashpassword,
      gender,
      location,
    ])

    if (password.length > 5) {
      res.status(200).send('User created successfully')
    }
  } else {
    res.status(400).send('User already exists')
  }
})

app.post('/login', async (req, res) => {
  const {username, password} = req.body

  const sqlquery = `SELECT * FROM user WHERE username = ?`
  const user = await db.get(sqlquery, [username])

  if (!user) {
    res.status(400).send('Invalid user')
    return
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (isMatch) {
    res.status(200).send('Login success!')
  } else {
    res.status(400).send('Invalid password')
  }
})

app.put('/change-password', async (req, res) => {
  const {username, oldPassword, newPassword} = req.body

  if (!username || !oldPassword || !newPassword) {
    res.status(400).send('Missing fields')
    return
  }
  const sqlquery = `select * from user where username=?`
  const dbquery = await db.get(sqlquery, [username])
  console.log('Entered:', oldPassword)
  console.log('Stored hash:', dbquery.password)
  var mismatch
  if (!dbquery) {
    res.status(400).send('Invalid user')
    return
  } else {
    mismatch = await bcrypt.compare(oldPassword, dbquery.password)
  }

  if (!mismatch) {
    res.status(400).send('Invalid current password')
    return
  }

  if (newPassword.length < 5) {
    res.status(400).send('Password is too short')
    return
  }
  const hashnewPassword = await bcrypt.hash(newPassword, 10)
  const updateQuery = `
  update user set password=? where username=?
  `
  const dbquery1 = await db.run(updateQuery, [hashnewPassword, username])
  res.status(200).send('Password updated')
})

module.exports = app

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


