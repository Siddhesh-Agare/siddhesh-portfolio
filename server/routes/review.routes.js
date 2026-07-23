import express from "express";
import upload from "../middleware/multer.js";
import {
  addReview,
  deleteReview,
  getAllReviews,
} from "../controllers/review.controllers.js";
import isAuth from "../middleware/isAuth.js";
const reviewRouter = express.Router();

reviewRouter.post("/add/:userId", upload.single("image"), addReview);
reviewRouter.delete("/delete/:reviewId", isAuth, deleteReview);
reviewRouter.get("/get/:userId", getAllReviews);

export default reviewRouter;