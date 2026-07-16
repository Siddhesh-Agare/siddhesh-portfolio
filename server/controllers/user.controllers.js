import UserModel from "../models/user.model.js";

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
  
