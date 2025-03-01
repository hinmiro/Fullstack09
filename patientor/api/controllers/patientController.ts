import { Request, Response } from 'express'
import z from 'zod'
import { getPatientData, newPatient } from '../services/patientService'
import { newEntryPatientSchema } from '../utils'

const getAllPatients = (_req: Request, res: Response): void => {
    const response = getPatientData()
    res.status(200).json(response)
}

const addNewPatient = (req: Request, res: Response): void => {
    try {
        const newPatientData = newEntryPatientSchema.parse(req.body)
        const response = newPatient(newPatientData)
        res.status(201).json(response)
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues })
        } else {
            res.status(400).send({ error: 'unknown error' })
        }
    }
}

export { getAllPatients, addNewPatient }
