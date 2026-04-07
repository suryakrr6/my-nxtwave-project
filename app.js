const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const bcrypt = require('bcrypt')

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
