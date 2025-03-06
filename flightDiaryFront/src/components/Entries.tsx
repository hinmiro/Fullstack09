import { Entry } from '../models/types.ts'

const Entries = ({ entries }: { entries: Entry[] }) => {


  return (
    <>
      <table style={{ flex: 1 }}>
        <tbody>
        {entries.map((entry, i: number) => (
          <tr key={i}>
            <td><i>{entry.date}</i></td>
            <td>{entry.weather}</td>
            <td>{entry.visibility}</td>
            <td style={{ paddingLeft: '3rem' }}>{entry.comment}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default Entries
