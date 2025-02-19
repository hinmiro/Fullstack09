export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: string
    occupation: string
}

export type NewPatient = Omit<Patient, 'id'>

export type SanitizedPatient = Omit<Patient, 'ssn'>
