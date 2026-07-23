import express from 'express'
import isAuth from '../middleware/isAuth.js';
import upload from '../middleware/multer.js';
import { addProject, deleteProject, getAdminProjects } from '../controllers/project.controllers.js';
const projectRouter = express.Router();

projectRouter.post("/add", isAuth, upload.single('projectImage'), addProject);
projectRouter.delete("/delete/:projectId", isAuth, upload.single('projectImage'), deleteProject);
projectRouter.get("/get-admin-projects/:userId",getAdminProjects);


export default projectRouter;