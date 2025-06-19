import { z } from 'zod'
import { newEntryPatientSchema } from '../api/utils'

export type Entry = HospitalEntry | OccupationalHealthcare | HealthCheckEntry

interface BaseEntry {
    id: string
    description: string
    date: string
    specialist: string
    diagnosisCodes?: string[]
}

interface HospitalEntry extends BaseEntry {
    type: 'Hospital'
    discharge: Discharge
}

interface OccupationalHealthcare extends BaseEntry {
    type: 'OccupationalHealthcare'
    employerName: string
    sickLeave?: SickLeave
}

interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck'
    healthCheckRating: HealthCheckRating
}

export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string
    entries: Entry[]
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface Discharge {
    date: string
    criteria: string
}

export interface SickLeave {
    startDate: string
    endDate: string
}

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3,
}

export type NewPatient = z.infer<typeof newEntryPatientSchema>

export type SanitizedPatient = Omit<Patient, 'ssn' | 'entries'>

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcare, 'id'>
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>
export type NewEntry =
    | NewHospitalEntry
    | NewOccupationalHealthcareEntry
    | NewHealthCheckEntry
