import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getPatientData, newPatient } from '../services/patientService'
import toPatient from '../utils'

const getAllPatients = (_req: Request, res: Response): void => {
    const response = getPatientData()
    res.status(200).json(response)
}

const addNewPatient = (req: Request, res: Response): void => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }
    try {
        const newPatientData = toPatient(req.body)
        const response = newPatient(newPatientData)
        if (response) {
            res.status(201).json(response)
        }
    } catch (error: unknown) {
        let msg = 'Something went wrong, '
        if (error instanceof Error) {
            msg += error.message
        }
        res.status(400).send(msg)
    }
}

export { getAllPatients, addNewPatient }
