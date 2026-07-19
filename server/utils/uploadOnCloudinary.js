import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
const uploadOnCloudinary = (fileBuffer, folderName) => {
  return new Promise((resolve, reject) => {
    const pipeForStream = cloudinary.uploader.upload_stream(
      {
        folder: folderName || "portfolio-profiles",
        resource_type: "auto",
      },
      (error, result) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(pipeForStream);
  });
};

export default uploadOnCloudinary;