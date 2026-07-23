import express from "express";

import isAuth from "../middleware/isAuth.js";
import {
  addEducation,
  deleteEducation,
  GetAdminEducation,
} from "../controllers/education.controllers.js";
const educationRouter = express.Router();

educationRouter.post("/add", isAuth, addEducation);
educationRouter.delete("/delete/:educationId", isAuth, deleteEducation);
educationRouter.get("/get-admin-educations", isAuth, GetAdminEducation);

export default educationRouter;