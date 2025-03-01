import { z } from 'zod'
import { newEntryPatientSchema } from '../api/utils'

export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export type NewPatient = z.infer<typeof newEntryPatientSchema>

export type SanitizedPatient = Omit<Patient, 'ssn'>
