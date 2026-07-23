 import express from 'express';
import isAuth from '../middleware/isAuth.js';
import upload from '../middleware/multer.js';
import { addSkill, getSkillsByAdmin, deleteSkill } from '../controllers/skill.controllers.js';

 const skillRouter = express.Router();

skillRouter.post('/add', isAuth, upload.single('skillImage'), addSkill);
skillRouter.get('/get-skills-admin/:userId', getSkillsByAdmin);
skillRouter.delete('/delete/:skillId', isAuth, deleteSkill);

 export default skillRouter;