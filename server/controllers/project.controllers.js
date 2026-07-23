import ProjectModel from "../models/project.model.js";
import UserModel from "../models/user.model.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

export const addProject = async(req, res)=>{
    try {

        const userId = req.userId;
        const {title, description, github, live}= req.body;
        if(!title || !description){
            return res
            .status(400)
            .json({success:false, message: "All fields are required!"});
        }

        const user = await UserModel.findById(userId)
        if(!user){
            return res
            .status(404)
            .json({success:false, message: "User not found!"});
        }

        let projectImage;
        if(!req.file){
            return res
            .status(400)
            .json({success: false, message: "Please upload a file"});
        }

        try {
            projectImage = await uploadOnCloudinary(req.file.buffer, "project-images",);
        } catch (error) {
            console.log(error, 'error in image upload');
            return res
            .status(500)
            .json({success: false, message: "Error in image upload"})
        }

        const project = await ProjectModel.create({
            userId,
            title,
            description,
            github,
            live,
            projectImage
        });

        return res.status(200).json({success: true, message: "Project added!"});
        
    } catch (error) {
        console.log(error, 'Error in add project');
        return res.status(500).json({success:false, message: "Internal Server Error!"})
    }
}

export const deleteProject = async(req, res)=>{
    try {
        const userId = req.userId;
        const projectId = req.params.projectId;
        const user = await UserModel.findById(userId);
        if(!user){
            return res
            .status(404)
            .json({success: false, message: 'User not found!'});
        }

        const project = await ProjectModel.findByIdAndDelete({
            _id:projectId,
        });
        if(!project){
            return res
            .status(404)
            .json({success:false, message:"Project not found!"});
        }
        return res.status(200).json({success: true, message: "Project deleted!"})
        
    } catch (error) {
        console.log(error, 'Error in delete  project');
        return res.status(500).json({success:false, message: "Internal Server Error!"})
    }
}

export const getAdminProjects = async(req, res)=>{
    try {
        const userId = req.params.userId;
        const user = await UserModel.findById(userId);
            if(!user){
                return res
                .status(404)
                .json({success: false, message: "User not found!"});
                
            }
        const projects = await ProjectModel.find({userId})
        return res
        .status(200)
        .json({success:true, projects})
        
    } catch (error) {
        console.log(error, 'Error in get admin project');
        return res.status(500).json({success:false, message: "Internal Server Error!"})
    }
}