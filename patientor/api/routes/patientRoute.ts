import express from 'express'
import {
    getAllPatients,
    addNewPatient,
    getPatientById,
} from '../controllers/patientController'
import { newPatientParses } from '../middlewares/validation'

const patientRouter = express.Router()

patientRouter
    .route('/')
    .get(getAllPatients)
    .post(newPatientParses, addNewPatient)

patientRouter.route('/:id').get(getPatientById)

export default patientRouter
