import data from '../../data/patients'
import { SanitizedPatient } from '../../types/patient-type'

const getPatientData = (): SanitizedPatient[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }))
}

export { getPatientData }
