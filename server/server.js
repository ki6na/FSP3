const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

// temporary array until we set up mongodb
let workouts = []

// get all workouts
app.get('/workouts', (req, res) => {
  res.json(workouts)
})

// add a workout
app.post('/workouts', (req, res) => {
  workouts.push(req.body)
  res.json(workouts)
})

app.listen(port, () => console.log(`server running on port ${port}`))