import express from 'express'
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('this is main page')
})

app.get('/api/data', (req, res) => {
  const data = ["aditya", "dubey"]  //it can be anything
  res.send(data)
})

app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
})