import upload from "../middleware/multer.js";
import UserModel from "../models/user.model.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

export const getCurrentUsers = async (req, res) => {
    try {

        const userId = req.userId;

        const user = await UserModel.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User found successfully",
            user,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error !"
        })
    }
}
  
export const updateProfile = async(req, res)=>{
    console.log("### RUNNING UPDATED updateProfile CODE ###");
    try {
        const userId = req.userId;
        let {name, 
            phone, 
            whatsappNumber, 
            address, 
            city, 
            state, 
            country, 
            title, 
            intro, 
            description, 
            github, 
            linkedin,
            instagram,
            facebook,
            twitter,
            youtube,
            isAvailable}=req.body;
        const user = await UserModel.findById(userId);
        if(!user){
            return res
                .status(404)
                .json({success: false, message: "User not found!"});
        }


        let profilePic;
        profilePic = user.profilePic;

        if(req.file && req.file.buffer){
           try {
                 profilePic = await uploadOnCloudinary(req.file.buffer);
           } catch (error) {
            console.log("CLOUDINARY ERROR DETAILS:", JSON.stringify(error, null, 2));
            return res.status(500).json({
                success:false,
                message: error?.message || "while  gfahauploading image",
                cloudinaryError: error, // TEMPORARY — remove once debugged
            });
           }
        }

        await UserModel.findByIdAndUpdate(userId, {
            name, 
            phone, 
            whatsappNumber, 
            address, 
            city, 
            state, 
            country, 
            title, 
            intro, 
            description, 
            github, 
            linkedin,
            instagram,
            facebook,
            twitter,
            youtube,
            profilePic,
            isAvailable

        },{new:true, runValidators: true});
        return res.status(200).json({success:true, message:"Profile updated!" });

    } catch (error) {
        console.log(error, "error in update profile");
        return res.status(500).json({success:false, message:"Internal Server Error!"});
        
    }
};