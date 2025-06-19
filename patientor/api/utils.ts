import z from 'zod'
import { Gender } from '../types/patient-type'

const newEntryPatientSchema = z.object({
    name: z.string().nonempty(),
    dateOfBirth: z.string().nonempty(),
    ssn: z.string().nonempty(),
    gender: z.nativeEnum(Gender),
    occupation: z.string().nonempty(),
})

const BaseNewEntrySchema = z.object({
    date: z.string(),
    specialist: z.string(),
    description: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
})

const NewHospitalEntrySchema = BaseNewEntrySchema.extend({
    type: z.literal('Hospital'),
    discharge: z.object({
        date: z.string(),
        criteria: z.string(),
    }),
})

const NewOccupationalHealthcareEntrySchema = BaseNewEntrySchema.extend({
    type: z.literal('OccupationalHealthcare'),
    employerName: z.string(),
    sickLeave: z
        .object({
            startDate: z.string(),
            endDate: z.string(),
        })
        .optional(),
})

const NewHealthCheckEntrySchema = BaseNewEntrySchema.extend({
    type: z.literal('HealthCheck'),
    healthCheckRating: z.number(),
})

export const NewEntrySchema = z.discriminatedUnion('type', [
    NewHospitalEntrySchema,
    NewOccupationalHealthcareEntrySchema,
    NewHealthCheckEntrySchema,
])

export { newEntryPatientSchema }
