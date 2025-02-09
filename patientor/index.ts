import express, {Request, Response} from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/api/ping', (_req: Request, res: Response): void => {
    console.log('Endpoint got pinged')
    res.send('PONG!')
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
})
