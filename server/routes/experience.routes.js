import express from "express";
import {
  addExperience,
  deleteExperience,
  GetAdminExperience,
} from "../controllers/experience.controllers.js";
import isAuth from "../middleware/isAuth.js";
const experienceRouter = express.Router();

experienceRouter.post("/add", isAuth, addExperience);
experienceRouter.delete("/delete/:experienceId", isAuth, deleteExperience);
experienceRouter.get("/get-admin-experiences", isAuth, GetAdminExperience);

export default experienceRouter;