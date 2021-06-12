const express = require('express')
const app = express()
const PORT = 3001

const fs = require('fs')
const path = require('path')
const pathToFile = path.resolve('./data.json')

const getResources = () => JSON.parse(fs.readFileSync(pathToFile))

app.use(express.json()) // to console.log the req.body

app.get('/', (req,res) => {
    res.send('API Manage Scape')
})

app.get('/api/resources', (req, res) => {
    const resources = getResources()
    res.send(resources)
  })

// Get resources by ID
app.get('/api/resources/:id', (req, res) => {
    const resources = getResources()
    const { id } = req.params // destructuring from req.params.id
    const resource = resources.find((resource) => resource.id === id)
    res.send(resource)
})

// Creating resources
app.post('/api/resources' , (req,res) => {
    const resources = getResources()
    const resource = req.body 
    
    resource.createdAt = new Date()
    resource.status = 'inactive'
    resource.id = Date.now().toString()

    resources.unshift(resource)

    // writing in JSON file
    fs.writeFile(pathToFile, JSON.stringify(resources, null, 2), error => {
        if(error) {
            return res.status(400).send('Failed to save data')
        }
        return res.send('Successfully saved data')
    })
})

// Updating resources
app.patch('/api/resources/:id', (req, res) => {
    const resources = getResources()
    const { id } = req.params // destructuring from req.params.id
    const index = resources.findIndex((resource) => resource.id === id)
    
    resources[index] = req.body // updating the resource

    // updating in JSON file
    fs.writeFile(pathToFile, JSON.stringify(resources, null, 2), error => {
        if(error) {
            return res.status(400).send('Failed to update data')
        }
        return res.send('Successfully updated data')
    })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})