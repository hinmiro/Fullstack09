import express, { Request, Response } from 'express'
import cors from 'cors'
import api from './api/index'
import { errorMiddleware } from './api/middlewares/errorMiddleware'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', api)

app.get('/api/ping', (_req: Request, res: Response): void => {
    console.log('Endpoint got pinged')
    res.send('PONG!')
})
app.use(errorMiddleware)

export default app
