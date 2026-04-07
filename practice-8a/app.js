const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()
app.use(express.json())

let db = null
const todo = async () => {
  try {
    db = await open({
      filename: 'todoApplication.db',
      driver: sqlite3.Database,
    })

    console.log('DB connected successfully')
    // app.listen(3000, () => {
    //   console.log('server is running at http://localhost:3000')
    // })
  } catch (e) {
    console.log(`DB:error is ${e.message}`)
  }
}
todo()

app.get('/todos/', async (req, res) => {
  const {status = '', search_q = '', priority = ''} = req.query
  let data = ''
  let query = []

  if (priority !== '' && status !== '') {
    data = `select * from todo where priority=? and status=?`
    query = [priority, status]
  } else if (status !== '') {
    data = `select * from todo where status=?`
    query = [status]
  } else if (priority !== '') {
    data = `select * from todo where priority=?`
    query = [priority]
  } else if (search_q !== '') {
    data = `select * from todo where todo LIKE ?`
    query = [`%${search_q}%`]
  } else {
    data = `select * from todo`
    query = []
  }
  const result = await db.all(data, query)
  res.send(result)
})

app.get('/todos/:todoId/', async (req, res) => {
  const {todoId} = req.params
  const data = `select * from todo where id=?`
  const result = await db.get(data, [todoId])
  res.send(result)
})

app.post('/todos/', async (req, res) => {
  const {id, todo, priority, status} = req.body
  const data = `insert into todo(id,todo,priority,status) values(?,?,?,?)`
  const result = await db.run(data, [id, todo, priority, status])
  res.send('Todo Successfully Added')
})

app.put('/todos/:todoId/', async (req, res) => {
  const {todoId} = req.params
  const {status, priority, todo} = req.body

  let data = ''
  let query = []
  let name = ''
  if (status !== undefined) {
    data = `update todo set status=? where id=?`
    name = 'Status'
    query = [status, todoId]
  } else if (priority !== undefined) {
    data = `update todo set priority=? where id=?`
    name = 'Priority'
    query = [priority, todoId]
  } else if (todo !== undefined) {
    data = `update todo set todo=? where id=?`
    name = 'Todo'
    query = [todo, todoId]
  }
  const result = await db.run(data, query)
  res.send(`${name} Updated`)
})
app.delete('/todos/:todoId/', async (req, res) => {
  const {todoId} = req.params
  const data = `delete from todo where id=?`
  const result = await db.run(data, [todoId])
  res.send('Todo Deleted')
})

module.exports = app
