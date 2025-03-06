import { useEffect, useState } from 'react'
import axios from 'axios'

interface Entry {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment: string,
}

function App() {
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    axios.get<Entry[]>('http://localhost:3000/api/diaries').then(response => {
      console.log(response.data)
      setEntries(response.data)
    })
  }, [])


  return (
    <>
      <h1>Flight diary</h1>
      <table style={{flex: 1}}>
        <tbody>
        {entries.map((entry, i: number) => (
          <tr key={i}>
            <td><i>{entry.date}</i></td>
            <td>{entry.weather}</td>
            <td>{entry.visibility}</td>
            <td style={{paddingLeft: '3rem'}}>{entry.comment}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default App
