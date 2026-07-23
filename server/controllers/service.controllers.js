import ServiceModel from "../models/service.model.js";
import UserModel from "../models/user.model.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

export const addService = async (req, res) => {
  try {
    let { title, description, category, price, deliveryTime } = req.body;
    price = parseInt(price);
    const userId = req.userId;
    let serviceImage;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!title || !description || !category || !price || !deliveryTime) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Service image is required" });
    }

    try {
      serviceImage = await uploadOnCloudinary(
        req.file.buffer,
        "service-images",
      );
    } catch (error) {
      console.log(error, "error in uploading service image");
      return res
        .status(500)
        .json({ success: false, message: "Error in uploading service image" });
    }

    const newService = new ServiceModel({
      title,
      description,
      category,
      price,
      deliveryTime,
      serviceImage,
      userId,
    });
    await newService.save();
    return res
      .status(200)
      .json({ success: true, message: "Service added successfully" });
  } catch (error) {
    console.log(error, "error in add service");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const userId = req.userId;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const service = await ServiceModel.findByIdAndDelete(serviceId);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.log(error, "error in delete service");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getAdminServices = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const services = await ServiceModel.find({ userId });
    return res.status(200).json({ success: true, services });
  } catch (error) {
    console.log(error, "error in get admin services");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};