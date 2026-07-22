import experienceModel from "../models/experience.model.js";
import UserModel from "../models/user.model.js";

export const addExperience = async (req, res) => {
  try {
    const userId = req.userId;
    const { company, position, description, startDate, endDate } = req.body;
    if (!company || !position || !description || !startDate || !endDate) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    const experience = await experienceModel.create({
      userId,
      company,
      position,
      description,
      startDate,
      endDate,
    });
    return res.status(200).json({ success: true, experience });
  } catch (error) {
    console.log(error, "error in addExperience");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
};
export const deleteExperience = async (req, res) => {
  try {
    const userId = req.userId;
    const experienceId = req.params.experienceId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    const experience = await experienceModel.findByIdAndDelete({
      _id: experienceId,
    });
    if (!experience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found!" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Experience deleted!" });
  } catch (error) {
    console.log(error, "error in deleteExperience");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
};

export const GetAdminExperience = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const experiences = await experienceModel.find({ userId });
    return res.status(200).json({ success: true, experiences });
  } catch (error) {
    console.log(error, "error in GetAdminExperience");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
};