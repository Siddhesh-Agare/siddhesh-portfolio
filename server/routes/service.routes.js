import express from "express";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import {
  addService,
  deleteService,
  getAdminServices,
} from "../controllers/service.controllers.js";
const serviceRouter = express.Router();

serviceRouter.get(
  "/get-admin-services/:userId",
  getAdminServices,
);
serviceRouter.post("/add", isAuth, upload.single("serviceImage"), addService);
serviceRouter.delete("/delete/:serviceId", isAuth, deleteService);

export default serviceRouter;