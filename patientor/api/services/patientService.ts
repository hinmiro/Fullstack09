import { Patient, Entry, NewEntry } from './../../types/patient-type'
import data from '../../data/patients'
import { v1 as uuid } from 'uuid'
import { NewPatient, SanitizedPatient } from '../../types/patient-type'

const getPatientData = (): SanitizedPatient[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender: gender,
        occupation,
    }))
}

const newPatient = (patient: NewPatient): SanitizedPatient => {
    const newPatient = { ...patient, id: uuid(), entries: [] }
    data.push(newPatient)
    const { ssn, ...sanitized } = newPatient
    return sanitized
}

const getPatientDataById = (id: string): Patient | undefined => {
    const patient = data.find((p) => p.id === id)

    if (!patient) {
        return undefined
    }

    return {
        ...patient,
        gender: patient.gender,
        entries: patient.entries,
    }
}

const addPatientEntry = (id: string, entry: NewEntry): Patient | undefined => {
    const patient = data.find((patient) => patient.id === id)
    if (!patient) {
        return undefined
    }
    const newEntry: Entry = { ...entry, id: uuid() }
    patient.entries.push(newEntry)
    return patient
}

export { getPatientData, newPatient, getPatientDataById, addPatientEntry }
