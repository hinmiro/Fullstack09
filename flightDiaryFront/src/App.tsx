import { useEffect, useState } from 'react'
import { Entry } from './models/types.ts'
import axios from 'axios'
import Entries from './components/Entries.tsx'
import Notification from './components/Notification.tsx'
import * as React from 'react'

function App() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [date, setDate] = useState(() => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  })

  useEffect(() => {
    axios.get<Entry[]>('http://localhost:3000/api/diaries').then((response) => {
      console.log(response.data)
      setEntries(response.data)
    })
  }, [])

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const entry: Entry = {
      date: date.toString(),
      weather: weather,
      visibility: visibility,
      comment: comment,
    }

    axios
      .post('http://localhost:3000/api/diaries/', entry)
      .then((result) => {
        setEntries([...entries, result.data])
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data)
        } else {
          setErrorMessage('Unexpected error occurred')
        }
        setTimeout(() => {
          setErrorMessage('')
        }, 3000)
      })
  }

  return (
    <>
      <h1>Flight diary</h1>
      <div>
        <h2>Add new entry</h2>
        <Notification errorMessage={errorMessage} />
        <form onSubmit={addEntry}>
          <div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label>Date:</label>
              <input
                type="date"
                aria-label={'Date:'}
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label>Weather:</label>
              <input
                type="radio"
                id="sunny"
                name="weather"
                value="sunny"
                aria-label="sunny"
                onChange={(event) => setWeather(event.target.value)}
              />
              <label htmlFor="sunny">Sunny</label>

              <input
                type="radio"
                id="rainy"
                name="weather"
                value="rainy"
                onChange={(event) => setWeather(event.target.value)}
              />
              <label htmlFor="rainy">Rainy</label>

              <input
                type="radio"
                id="cloudy"
                name="weather"
                value="cloudy"
                onChange={(event) => setWeather(event.target.value)}
              />
              <label htmlFor="cloudy">Cloudy</label>

              <input
                type="radio"
                id="stormy"
                name="weather"
                value="stormy"
                onChange={(event) => setWeather(event.target.value)}
              />
              <label htmlFor="stormy">Stormy</label>

              <input
                type="radio"
                id="windy"
                name="weather"
                value="windy"
                onChange={(event) => setWeather(event.target.value)}
              />
              <label htmlFor="windy">Windy</label>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label>Visibility:</label>
              <input
                type="radio"
                id="great"
                name="visibility"
                value="great"
                aria-label="great"
                onChange={(event) => setVisibility(event.target.value)}
              />
              <label htmlFor="great">Great</label>

              <input
                type="radio"
                id="good"
                name="visibility"
                value="good"
                aria-label="good"
                onChange={(event) => setVisibility(event.target.value)}
              />
              <label htmlFor="good">Good</label>

              <input
                type="radio"
                id="ok"
                name="visibility"
                value="ok"
                aria-label="ok"
                onChange={(event) => setVisibility(event.target.value)}
              />
              <label htmlFor="ok">Ok</label>

              <input
                type="radio"
                id="poor"
                name="visibility"
                value="poor"
                aria-label="poor"
                onChange={(event) => setVisibility(event.target.value)}
              />
              <label htmlFor="poor">Poor</label>

            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label>Comment:</label>
              <input
                aria-label="Comment: "
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </div>
            <button type="submit">Add</button>
          </div>
        </form>
        <br />
      </div>
      <Entries entries={entries} />
    </>
  )
}

export default App
