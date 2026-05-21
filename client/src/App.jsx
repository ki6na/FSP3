import { useState } from 'react'
import './App.css'

function App() {
  const [exercise, setExercise] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')
  const [log, setLog] = useState([])

  const addWorkout = () => {
    setLog([...log, { exercise, sets, reps, weight }])
    setExercise('')
    setSets('')
    setReps('')
    setWeight('')
  }

  return (
    <div className="app">
      <h1>Workout Tracker</h1>

      <input placeholder="exercise" value={exercise} onChange={e => setExercise(e.target.value)} />
      <input placeholder="sets" value={sets} onChange={e => setSets(e.target.value)} />
      <input placeholder="reps" value={reps} onChange={e => setReps(e.target.value)} />
      <input placeholder="weight (lbs)" value={weight} onChange={e => setWeight(e.target.value)} />
      <button onClick={addWorkout}>add</button>

      <h2>log</h2>
      <ul>
        {log.map((w, i) => (
          <li key={i}>{w.exercise} {w.sets}x{w.reps} at {w.weight}lbs</li>
        ))}
      </ul>
    </div>
  )
}

export default App