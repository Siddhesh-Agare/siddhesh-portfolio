import mongoose from "mongoose";
const skillSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    skillName:{
        type: String,
        required: true
    },
    skillLevel:{
        type: Number,
        required:true,
    },
    skillImage:{
        type: String,
        required: true,
    }
    


}, {timestamps: true})

const skillModel = mongoose.models.Skill || mongoose.model('Skill', skillSchema)

export default skillModel