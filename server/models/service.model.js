import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },

    serviceImage: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    deliveryTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ServiceModel =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default ServiceModel;