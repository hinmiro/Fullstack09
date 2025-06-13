import { Patient, Gender, Entry } from './../../types/patient-type'
import data from '../../data/patients'
import { v1 as uuid } from 'uuid'
import { NewPatient, SanitizedPatient } from '../../types/patient-type'

const getPatientData = (): SanitizedPatient[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender: gender as Gender,
        occupation,
    }))
}

const newPatient = (patient: NewPatient): SanitizedPatient => {
    const newPatient = { ...patient, id: uuid() }
    data.push(newPatient)
    const { ssn, ...sanitized } = newPatient
    return sanitized
}

const getPatientDataById = (id: string): Patient | undefined => {
    const patient = data.find((p) => p.id === id)
    if (!patient) {
        return undefined
    }
    return { ...patient, gender: patient.gender as Gender, entries: patient.entries as Entry[] }
}

export { getPatientData, newPatient, getPatientDataById }
