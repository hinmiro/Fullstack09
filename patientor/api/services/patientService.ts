import data from '../../data/patients'
import { v1 as uuid } from 'uuid'
import { Gender, NewPatient, SanitizedPatient } from '../../types/patient-type'

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

export { getPatientData, newPatient }
