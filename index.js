const express = require('express')
const app = express()
const PORT = 3001

const fs = require('fs')
const path = require('path')
const pathToFile = path.resolve('./data.json')

const getResources = () => JSON.parse(fs.readFileSync(pathToFile))

app.use(express.json()) // to console.log the req.body

app.get('/', (req,res) => {
    res.send('Hello world')
})

app.get('/api/resources', (req, res) => {
    const resources = getResources()
    res.send(resources)
  })

app.post('/api/resources' , (req,res) => {
    const resources = getResources()
    console.log(req.body)
    res.send('Your response has been recieved successfully')
})

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})