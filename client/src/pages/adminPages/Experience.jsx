import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import useFetchExperieces from "../../hooks/useFetchExperiences";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  FiBriefcase,
  FiAward,
  FiCalendar,
  FiAlignLeft,
  FiTrash2,
  FiInbox,
} from "react-icons/fi";

const Experience = () => {
  const fetchExperiences = useFetchExperieces();
  const token = localStorage.getItem("token");
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const { experiences } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/experience/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response?.data?.success) {
        toast.success(
          response?.data?.message || "Experience added successfully",
        );
        fetchExperiences();
        setFormData({
          company: "",
          position: "",
          description: "",
          startDate: "",
          endDate: "",
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error in addExperience");
      toast.error(error?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const deleteExperience = async (id) => {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/experience/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.success) {
        toast.success(
          response?.data?.message || "Experience deleted successfully",
        );
        fetchExperiences();
      }
    } catch (error) {
      console.log(error, "error in deleteExperience");
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-400/10 pb-5">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
            <FiBriefcase className="text-blue-400 h-5 w-5" />
            Experience Workspace
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Log your professional journey and work history.
          </p>
        </div>
      </div>

      {/* Main Creation Form Surface — navy-blue glass panel */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-400/[0.09] bg-blue-950/20 backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/20 to-transparent" />
        <div className="border-b border-blue-400/10 bg-blue-950/20 p-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Add Work Experience
          </h3>
        </div>

        <form onSubmit={onSubmitHandler} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Company Name
              </label>
              <div className="relative flex items-center">
                <FiBriefcase className="absolute left-3.5 text-slate-500 h-4 w-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Google, Microsoft"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm placeholder:text-slate-600 text-white transition-all outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20"
                />
              </div>
            </div>

            {/* Position Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Job Position
              </label>
              <div className="relative flex items-center">
                <FiAward className="absolute left-3.5 text-slate-500 h-4 w-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Developer"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm placeholder:text-slate-600 text-white transition-all outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20"
                />
              </div>
            </div>

            {/* Start Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Start Date
              </label>
              <div className="relative flex items-center">
                <FiCalendar className="absolute left-3.5 text-slate-500 h-4 w-4 pointer-events-none z-10" />
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm text-white transition-all outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 [color-scheme:dark]"
                />
              </div>
            </div>

            {/* End Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                End Date{" "}
                <span className="text-slate-600 lowercase font-normal tracking-normal">
                  (Leave blank if current)
                </span>
              </label>
              <div className="relative flex items-center">
                <FiCalendar className="absolute left-3.5 text-slate-500 h-4 w-4 pointer-events-none z-10" />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm text-white transition-all outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 [color-scheme:dark]"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Role Description
            </label>
            <div className="relative">
              <FiAlignLeft className="absolute left-3.5 top-3.5 text-slate-500 h-4 w-4 pointer-events-none" />
              <textarea
                name="description"
                rows="4"
                placeholder="Describe your responsibilities, achievements, and tech stack used..."
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm placeholder:text-slate-600 text-white transition-all outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 resize-y"
              ></textarea>
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
                <span>Add Experience</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Experience Timeline / Cards Section */}
      <div className="pt-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
          Work History Portfolio
        </h3>

        {experiences?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <AnimatePresence initial={false}>
              {experiences.map((experience) => (
                <motion.div
                  key={experience._id}
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

                  {/* Header Info */}
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {experience.position}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <FiBriefcase className="text-blue-400 h-3.5 w-3.5" />
                        <p className="text-sm font-medium text-slate-400">
                          {experience.company}
                        </p>
                      </div>
                    </div>

                    {/* Styled Dates using Moment.js */}
                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/30 border border-blue-400/10 text-xs font-mono font-bold text-slate-400">
                        <FiCalendar className="text-slate-500 h-3 w-3" />
                        {moment(experience.startDate).format("MMM YYYY")}
                        <span className="text-slate-500 font-normal mx-0.5">
                          →
                        </span>
                        <span
                          className={!experience.endDate ? "text-blue-400" : ""}
                        >
                          {experience.endDate
                            ? moment(experience.endDate).format("MMM YYYY")
                            : "Present"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description Body */}
                  <div className="mt-4 flex-1">
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {experience.description}
                    </p>
                  </div>

                  {/* Action Footer */}
                  <div className="mt-5 pt-4 border-t border-blue-400/10 flex justify-end">
                    <button
                      onClick={() => deleteExperience(experience._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider rounded-lg hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer focus:outline-none"
                    >
                      <FiTrash2 className="h-3.5 w-3.5" /> Delete Role
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-blue-400/20 bg-blue-950/10 py-14 text-center">
            <FiInbox className="h-6 w-6 text-slate-500" />
            <p className="text-sm text-slate-400">No experience added yet.</p>
            <p className="text-xs text-slate-600">
              Use the form above to log your first role.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;