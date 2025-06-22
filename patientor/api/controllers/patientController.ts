import { Request, Response } from 'express'
import z from 'zod'
import {
    getPatientData,
    newPatient,
    getPatientDataById,
    addPatientEntry,
} from '../services/patientService'
import { newEntryPatientSchema, NewEntrySchema } from '../utils'

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

const getPatientById = (req: Request, res: Response): void => {
    const response = getPatientDataById(req.params.id)
    res.status(200).json(response)
}

const addEntry = (req: Request, res: Response): void => {
    const id = req.params.id
    console.log(req.body);
    
    try {
        const parsedEntry = NewEntrySchema.parse(req.body)
        console.log('parsed -- ', parsedEntry);
        
        const response = addPatientEntry(id, parsedEntry)
        console.log('response server: ', response);
        
        res.status(200).json(response)
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues })
        } else {
            res.status(400).send({ error: 'Invalid entry data' })
        }
    }
}

export { getAllPatients, addNewPatient, getPatientById, addEntry }
