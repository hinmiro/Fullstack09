import express from 'express'

import diagnoseRouter from './routes/diagnoseRoute'
import patientRouter from './routes/patientRoute'

const router = express.Router()

router.use('/diagnoses', diagnoseRouter)
router.use('/patients', patientRouter)

export default router
