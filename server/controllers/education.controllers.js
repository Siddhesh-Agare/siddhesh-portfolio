import EducationModel from "../models/education.model.js";
import UserModel from "../models/user.model.js";

export const addEducation = async (req, res) => {
  try {
    const userId = req.userId;
    const { school, degree, startDate, endDate } = req.body;
    if (!school || !degree || !startDate || !endDate) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const education = new EducationModel({
      userId,
      school,
      degree,
      startDate,
      endDate,
    });
    await education.save();
    return res
      .status(201)
      .json({ success: true, message: "Education added successfully" });
  } catch (error) {
    console.log(error, "error in addEducation");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const userId = req.userId;
    const { educationId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const education = await EducationModel.findByIdAndDelete(educationId);
    if (!education) {
      return res
        .status(404)
        .json({ success: false, message: "Education not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Education deleted successfully" });
  } catch (error) {
    console.log(error, "error in deleteEducation");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const GetAdminEducation = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const educations = await EducationModel.find({ userId }).sort({
      startDate: -1,
    });
    return res.status(200).json({ success: true, educations });
  } catch (error) {
    console.log(error, "error in GetAdminEducation");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};