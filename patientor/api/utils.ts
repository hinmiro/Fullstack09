import { Gender, NewPatient } from '../types/patient-type'

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}

const isGender = (param: string): param is Gender => {
    return Object.values(Gender)
        .map((g) => g.toString())
        .includes(param)
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender value: ' + gender)
    }
    return gender
}

const isNewPatient = (object: unknown): object is NewPatient => {
    return (
        typeof object === 'object' &&
        object !== null &&
        isString((object as NewPatient).name) &&
        isString((object as NewPatient).dateOfBirth) &&
        isString((object as NewPatient).ssn) &&
        parseGender((object as NewPatient).gender) &&
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
