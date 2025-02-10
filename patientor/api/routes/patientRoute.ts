import express from 'express'
import getAllPatients from '../controllers/patientController'

const patientRouter = express.Router()

patientRouter.route('/').get(getAllPatients)

export default patientRouter
