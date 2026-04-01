const express = require('express')
const app = express()

app.get('/', (req, res) => {
  let date = new Date()

  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const dateFormated = `${day}-${month + 1}-${year}`
  res.send(dateFormated)
})
app.listen(3000)
module.exports = app
