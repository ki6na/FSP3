import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

// form for adding/editing workouts
function WorkoutForm({ onAdd }) {
  const [exercise, setExercise] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')

  const handleSubmit = () => {
    onAdd({ exercise, sets, reps, weight })
    setExercise('')
    setSets('')
    setReps('')
    setWeight('')
  }

  return (
    <div>
      <input placeholder="exercise" value={exercise} onChange={e => setExercise(e.target.value)} />
      <input placeholder="sets" value={sets} onChange={e => setSets(e.target.value)} />
      <input placeholder="reps" value={reps} onChange={e => setReps(e.target.value)} />
      <input placeholder="weight (lbs)" value={weight} onChange={e => setWeight(e.target.value)} />
      <button onClick={handleSubmit}>add</button>
    </div>
  )
}

// list of logged workouts
function WorkoutList({ log, onDelete }) {
  return (
    <ul>
      {log.map((w) => (
        <li key={w._id}>
          {w.exercise} {w.sets}x{w.reps} at {w.weight}lbs
          <button onClick={() => onDelete(w._id)}>delete</button>
        </li>
      ))}
    </ul>
  )
}

function App() {
  const [log, setLog] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/workouts')
      .then(res => setLog(res.data))
  }, [])

  const addWorkout = (workout) => {
    axios.post('http://localhost:3000/workouts', workout)
      .then(res => setLog(res.data))
  }

  const deleteWorkout = (id) => {
    axios.delete(`http://localhost:3000/workouts/${id}`)
      .then(res => setLog(res.data))
  }

  return (
    <div className="app">
      <h1>Workout Tracker</h1>
      <WorkoutForm onAdd={addWorkout} />
      <h2>log</h2>
      <WorkoutList log={log} onDelete={deleteWorkout} />
    </div>
  )
}

export default App