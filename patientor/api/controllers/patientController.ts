import { Request, Response } from 'express'
import { getPatientData } from '../services/patientService'

const getAllPatients = (_req: Request, res: Response): void => {
    const response = getPatientData()
    res.status(200).json(response)
}

export default getAllPatients
