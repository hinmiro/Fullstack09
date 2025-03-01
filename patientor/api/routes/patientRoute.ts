import express from 'express'
import { getAllPatients, addNewPatient } from '../controllers/patientController'
import { newPatientParses } from '../middlewares/validation'

const patientRouter = express.Router()

patientRouter
    .route('/')
    .get(getAllPatients)
    .post(newPatientParses, addNewPatient)

export default patientRouter
