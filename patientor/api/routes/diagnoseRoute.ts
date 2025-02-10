import express from 'express'
import {getAllDiagnoses} from "../controllers/diagnoseController";

const diagnoseRouter = express.Router()

diagnoseRouter
    .route('/')
    .get(getAllDiagnoses)

export default diagnoseRouter
