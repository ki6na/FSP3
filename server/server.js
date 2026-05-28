const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Workout = require('./schema/workout')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

// connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/workouttracker')
  .then(() => {
    console.log('MongoDB connected')
    app.listen(port, () => console.log(`server running on port ${port}`))
  })
  .catch(err => console.log('connection error:', err))

// get all workouts
app.get('/workouts', (req, res) => {
  Workout.find().sort({ createdAt: -1 })
    .then(workouts => res.json(workouts))
})

// add a workout
app.post('/workouts', (req, res) => {
  const newWorkout = new Workout(req.body)
  newWorkout.save()
    .then(() => Workout.find().sort({ createdAt: -1 }))
    .then(workouts => res.json(workouts))
})

// update a workout
app.put('/workouts/:id', (req, res) => {
  Workout.findByIdAndUpdate(req.params.id, req.body)
    .then(() => Workout.find().sort({ createdAt: -1 }))
    .then(workouts => res.json(workouts))
})

// delete a workout
app.delete('/workouts/:id', (req, res) => {
  Workout.findByIdAndDelete(req.params.id)
    .then(() => Workout.find().sort({ createdAt: -1 }))
    .then(workouts => res.json(workouts))
})