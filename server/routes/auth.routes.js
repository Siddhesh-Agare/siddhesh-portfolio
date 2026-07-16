import express from 'express'
import { testingApi, registerUser, loginUser } from '../controllers/auth.controllers.js'
const authRouter = express.Router()

authRouter.get('/test', testingApi);

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
export default authRouter