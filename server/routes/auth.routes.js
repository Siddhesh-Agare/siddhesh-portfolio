import express from 'express'
import { testingApi } from '../controllers/auth.controllers.js'
import { registerUser } from '../controllers/auth.controllers.js'
const authRouter = express.Router()

authRouter.get('/test', testingApi);

authRouter.post('/register', registerUser);
export default authRouter