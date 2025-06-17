import { Request, Response } from 'express'
import { getDiagnoses } from '../services/diagnoseService'

const getAllDiagnoses = (_req: Request, res: Response): void => {
    const response = getDiagnoses()
    res.status(200).json(response)
}


export { getAllDiagnoses }
