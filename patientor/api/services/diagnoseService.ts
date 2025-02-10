import data from '../../data/diagnoses'
import { Diagnose } from '../../types/diagnose-types'

const getDiagnoses = (): Diagnose[] => {
    return data
}

export { getDiagnoses }
