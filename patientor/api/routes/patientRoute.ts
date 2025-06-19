import express from 'express'
import {
    getAllPatients,
    addNewPatient,
    getPatientById,
    addEntry
} from '../controllers/patientController'
import { newPatientParses } from '../middlewares/validation'

const patientRouter = express.Router()

patientRouter
    .route('/')
    .get(getAllPatients)
    .post(newPatientParses, addNewPatient)

patientRouter.route('/:id').get(getPatientById)

patientRouter.route('/:id/entries').post(addEntry)

export default patientRouter
