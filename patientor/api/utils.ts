import { NewPatient } from '../types/patient-type'

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}

const isNewPatient = (object: unknown): object is NewPatient => {
    return (
        typeof object === 'object' &&
        object !== null &&
        isString((object as NewPatient).name) &&
        isString((object as NewPatient).dateOfBirth) &&
        isString((object as NewPatient).ssn) &&
        isString((object as NewPatient).gender) &&
        isString((object as NewPatient).occupation)
    )
}

const toPatient = (object: unknown): NewPatient => {
    if (!isNewPatient(object)) {
        throw new Error('Invalid patient data')
    }
    return object
}

export default toPatient
