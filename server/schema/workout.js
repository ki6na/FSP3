const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
  exercise: String,
  sets: Number,
  reps: Number,
  weight: Number,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Workout', workoutSchema)o