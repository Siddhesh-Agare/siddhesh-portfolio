import mongoose from "mongoose";
const educationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const EducationModel =
  mongoose.models.Education || mongoose.model("Education", educationSchema);
export default EducationModel;