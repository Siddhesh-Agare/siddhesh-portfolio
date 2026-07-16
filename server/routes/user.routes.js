import express from 'express'
import { getCurrentUsers } from '../controllers/user.controllers.js'
import  isAuth  from '../middleware/isAuth.js'
const userRouter = express.Router()

userRouter.get('/current-user', isAuth, getCurrentUsers);
export default userRouter 