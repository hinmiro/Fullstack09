import z from 'zod'
import { Gender } from '../types/patient-type'

const newEntryPatientSchema = z.object({
    name: z.string().nonempty(),
    dateOfBirth: z.string().nonempty(),
    ssn: z.string().nonempty(),
    gender: z.nativeEnum(Gender),
    occupation: z.string().nonempty(),
})

export { newEntryPatientSchema }
