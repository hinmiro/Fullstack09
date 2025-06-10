import { ErrorMessage } from '../models/types'

const Notification = ({ errorMessage }: ErrorMessage) => {
  return (
    <div>
      <h4 style={{ color: 'red' }}>{errorMessage}</h4>
    </div>
  )
}

export default Notification
