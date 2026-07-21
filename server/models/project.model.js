import mongoose from 'mongoose'
const projectSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true,
    },
    projectImage:{
        type: String,
        required: true
    },
    github:{
        type:String,
    },
    live:{
        type:String,
    }




},{timestamps: true})

const ProjectModel = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default ProjectModel 