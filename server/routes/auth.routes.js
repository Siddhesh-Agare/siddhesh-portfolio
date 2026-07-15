import express from 'express'
import { testingApi } from '../controllers/auth.controllers.js'
const authRouter = express.Router()

authRouter.get('/test', testingApi);

export default authRouter