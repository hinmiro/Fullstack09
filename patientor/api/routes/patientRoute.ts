import express from 'express'
import { getAllPatients, addNewPatient } from '../controllers/patientController'
import { body } from 'express-validator'
import { Gender } from '../../types/patient-type'

const patientRouter = express.Router()

patientRouter
    .route('/')
    .get(getAllPatients)
    .post(
        body('name').isString().notEmpty(),
        body('dateOfBirth').isString().notEmpty(),
        body('ssn').isString().notEmpty(),
        body('gender').isIn(Object.values(Gender)),
        body('occupation').isString().notEmpty(),
        addNewPatient
    )
export default patientRouter
