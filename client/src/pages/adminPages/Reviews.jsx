import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";
import useFetchReviews from "../../hooks/useFetchReviews";
import { useSelector } from "react-redux";
import {
  FiMessageSquare,
  FiUser,
  FiUploadCloud,
  FiTrash2,
  FiInbox,
  FiSend,
} from "react-icons/fi";

const Reviews = () => {
  const fetchReviews = useFetchReviews();
  const { reviews } = useSelector((state) => state.user);
  const userId = import.meta.env.VITE_USER_ID;
  const [formData, setFormData] = useState({
    name: "",
    content: "",
  });
  const token = localStorage.getItem("token");
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  // Separate states for image
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Input Handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("content", formData.content);

      if (image) {
        data.append("image", image);
      }

      const response = await axios.post(
        `${serverUrl}/api/review/add/${userId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message || "Review added successfully");
        fetchReviews();
        setFormData({
          name: "",
          content: "",
        });
        setImage(null);
        setPreviewImage("");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/review/delete/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.success) {
        toast.success(
          response?.data?.message || "Review deleted successfully",
        );
        fetchReviews();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-400/10 pb-5">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
            <FiMessageSquare className="text-blue-400 h-5 w-5" />
            Reviews Workspace
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Collect and showcase testimonials from your clients and
            colleagues.
          </p>
        </div>
      </div>

      {/* Main Creation Form Surface — navy-blue glass panel */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-400/[0.09] bg-blue-950/20 backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/20 to-transparent" />
        <div className="border-b border-blue-400/10 bg-blue-950/20 p-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Add Review
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image Upload Area */}
            <div className="w-full lg:w-1/4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Reviewer Photo
              </label>
              <div className="relative group w-full aspect-square rounded-xl border-2 border-dashed border-blue-400/20 hover:border-blue-400/60 transition-all flex items-center justify-center overflow-hidden bg-blue-950/30">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Reviewer preview"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1.5 text-slate-500">
                    <FiUser className="h-7 w-7" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      No photo
                    </span>
                  </div>
                )}
                <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-150">
                  <FiUploadCloud className="text-white h-6 w-6 mb-1" />
                  <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                    Upload
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Core Details Inputs */}
            <div className="w-full lg:w-3/4 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Reviewer Name
                </label>
                <div className="relative flex items-center">
                  <FiUser className="absolute left-3.5 text-slate-500 h-4 w-4 pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Jane Cooper"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm placeholder:text-slate-600 text-white transition-all outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Review Content
                </label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-3.5 top-3.5 text-slate-500 h-4 w-4 pointer-events-none" />
                  <textarea
                    name="content"
                    rows="4"
                    placeholder="Write what they had to say about working with you..."
                    value={formData.content}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm placeholder:text-slate-600 text-white transition-all outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 resize-y"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 flex justify-end border-t border-blue-400/10 mt-6 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 disabled:bg-blue-500/20 disabled:text-slate-400/50 disabled:cursor-not-allowed text-[#020817] text-sm font-semibold h-11 rounded-lg transition-colors cursor-pointer focus:outline-none"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-[#020817]/30 border-t-[#020817] rounded-full animate-spin" />
              ) : (
                <>
                  <FiSend className="h-4 w-4" />
                  <span>Save Review</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Reviews Grid Display Section */}
      <div className="pt-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
          Testimonials Portfolio
        </h3>

        {reviews?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence initial={false}>
              {reviews.map((review) => (
                <motion.div
                  key={review._id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="relative overflow-hidden rounded-2xl border border-blue-400/[0.09] bg-blue-950/20 backdrop-blur-xl p-5 md:p-6 flex flex-col group shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] transition-colors hover:border-blue-400/30 hover:bg-blue-950/30"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/15 to-transparent" />

                  {/* Left Highlight Bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-950/60 group-hover:bg-blue-500 transition-colors" />

                  {/* Reviewer Header */}
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 shrink-0 rounded-full bg-blue-500/10 border border-blue-400/10 flex items-center justify-center overflow-hidden">
                      {review?.image ? (
                        <img
                          src={review.image}
                          alt={review.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <FiUser className="h-5 w-5 text-blue-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-sm font-semibold text-white truncate">
                        {review?.name}
                      </h2>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Reviewer
                      </p>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mt-4 flex-1">
                    <FiMessageSquare className="text-blue-400/30 h-5 w-5 mb-1.5" />
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-4">
                      {review?.content}
                    </p>
                  </div>

                  {/* Action Footer */}
                  <div className="mt-5 pt-4 border-t border-blue-400/10 flex justify-end">
                    <button
                      onClick={() => deleteReview(review?._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider rounded-lg hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer focus:outline-none"
                    >
                      <FiTrash2 className="h-3.5 w-3.5" /> Delete Review
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-blue-400/20 bg-blue-950/10 py-14 text-center">
            <FiInbox className="h-6 w-6 text-slate-500" />
            <p className="text-sm text-slate-400">No reviews added yet.</p>
            <p className="text-xs text-slate-600">
              Use the form above to add your first testimonial.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;