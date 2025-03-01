import { Request, Response, NextFunction } from 'express'
import { newEntryPatientSchema } from '../utils'

const newPatientParses = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newEntryPatientSchema.parse(req.body)
        next()
    } catch (error: unknown) {
        next(error)
    }
}

export { newPatientParses }
