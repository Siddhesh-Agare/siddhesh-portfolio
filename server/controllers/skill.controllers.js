import skillModel from "../models/skills.model.js";
import UserModel from "../models/user.model.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

export const addSkill = async (req, res) => {
  try {
    let userId = req.userId;
    let skillName = req.body.skillName;
    let skillLevel = parseInt(req.body.skillLevel);

    let skillImage;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload a file" });
    }

    try {
      skillImage = await uploadOnCloudinary(
        req.file.buffer,
        "portfolio-skills",
      );
    } catch (error) {
      console.log(error, "error in image upload");
      return res
        .status(500)
        .json({ success: false, message: "Image upload failed!" });
    }

    const skill = await skillModel.create({
      userId,
      skillName,
      skillLevel,
      skillImage,
    });

    return res.status(200).json({ success: true, message: "Skill added!" });
  } catch (error) {
    console.log(error, "error in add skill");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const userId = req.userId;
    const skillId = req.params.skillId;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const skill = await skillModel.findByIdAndDelete({
      _id: skillId,
    });
    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found!" });
    }
    return res.status(200).json({ success: true, message: "Skill deleted!" });
  } catch (error) {
    console.log(error, "error in deleteSkill");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
};

export const getSkillsByAdmin = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const skills = await skillModel.find({ userId });

    return res.status(200).json({ success: true, skills });
  } catch (error) {
    console.log(error, "error in getSkillsByAdmin");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
};