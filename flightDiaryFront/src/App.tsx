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

  useEffect(() => {
    axios.get<Entry[]>('http://localhost:3000/api/diaries').then((response) => {
      console.log(response.data)
      setEntries(response.data)
    })
  }, [])

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const date = new Date().toISOString().toString().split('T')
    const entry: Entry = {
      date: date[0].toString(),
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
              <label>Weather:</label>
              <input
                aria-label={'Weather: '}
                value={weather}
                onChange={(event) => setWeather(event.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label>Visibility:</label>
              <input
                aria-label="Visibility: "
                value={visibility}
                onChange={(event) => setVisibility(event.target.value)}
              />
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
