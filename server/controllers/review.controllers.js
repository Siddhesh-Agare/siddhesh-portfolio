import ReviewModel from "../models/review.model.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";
import UserModel from "../models/user.model.js";
export const addReview = async (req, res) => {
  try {
    const { content, name } = req.body;
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    let image;
    if (!content || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (req.file) {
      try {
        image = await uploadOnCloudinary(req.file.buffer, "review-images");
      } catch (error) {
        console.log(error, "erorr in image upload");
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    }

    const review = await ReviewModel.create({
      content,
      name,
      image,
      userId,
    });

    return res.status(200).json({ success: true, message: "Review added!" });
  } catch (error) {
    console.log(error, "error in add review");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const userId = req.userId;
    const reviewId = req.params.reviewId;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const review = await ReviewModel.findByIdAndDelete(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.log(error, "error in deleteReview");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const reviews = await ReviewModel.find({ userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error("Error in getAllReviews:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};