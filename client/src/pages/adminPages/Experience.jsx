import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import useFetchExperieces from "../../hooks/useFetchExperiences";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  FiBriefcase,
  FiAward,
  FiCalendar,
  FiAlignLeft,
  FiTrash2,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#282828] pb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#F1F1F1] tracking-tight flex items-center gap-2">
            <FiBriefcase className="text-[#3EA6FF] h-5 w-5" />
            Experience Workspace
          </h1>
          <p className="text-xs text-[#AAAAAA] mt-1">
            Log your professional journey and work history.
          </p>
        </div>
      </div>

      {/* Main Creation Form Surface */}
      <div className="bg-[#1F1F1F] border border-[#282828] rounded-xl overflow-hidden">
        <div className="border-b border-[#282828] bg-[#161616]/60 p-5">
          <h3 className="text-sm font-bold text-[#F1F1F1] uppercase tracking-wider">
            Add Work Experience
          </h3>
        </div>

        <form onSubmit={onSubmitHandler} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                Company Name
              </label>
              <div className="relative flex items-center">
                <FiBriefcase className="absolute left-3.5 text-[#717171] h-4 w-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Google, Microsoft"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm placeholder:text-[#606060] text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF]"
                />
              </div>
            </div>

            {/* Position Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                Job Position
              </label>
              <div className="relative flex items-center">
                <FiAward className="absolute left-3.5 text-[#717171] h-4 w-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Developer"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm placeholder:text-[#606060] text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF]"
                />
              </div>
            </div>

            {/* Start Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                Start Date
              </label>
              <div className="relative flex items-center">
                <FiCalendar className="absolute left-3.5 text-[#717171] h-4 w-4 pointer-events-none z-10" />
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF] [color-scheme:dark]"
                />
              </div>
            </div>

            {/* End Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                End Date{" "}
                <span className="text-[#606060] lowercase font-normal tracking-normal">
                  (Leave blank if current)
                </span>
              </label>
              <div className="relative flex items-center">
                <FiCalendar className="absolute left-3.5 text-[#717171] h-4 w-4 pointer-events-none z-10" />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF] [color-scheme:dark]"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
              Role Description
            </label>
            <div className="relative">
              <FiAlignLeft className="absolute left-3.5 top-3.5 text-[#717171] h-4 w-4 pointer-events-none" />
              <textarea
                name="description"
                rows="4"
                placeholder="Describe your responsibilities, achievements, and tech stack used..."
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm placeholder:text-[#606060] text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF] resize-y"
              ></textarea>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 flex justify-end border-t border-[#282828] mt-6 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 flex items-center justify-center gap-2 bg-[#3EA6FF] hover:bg-[#65B8FF] disabled:bg-[#3EA6FF]/20 disabled:text-[#AAAAAA]/50 disabled:cursor-not-allowed text-[#0F0F0F] text-sm font-semibold h-11 rounded-lg transition-colors cursor-pointer focus:outline-none"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-[#0F0F0F]/30 border-t-[#0F0F0F] rounded-full animate-spin" />
              ) : (
                <span>Add Experience</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Experience Timeline / Cards Section */}
      <div className="pt-4">
        <h3 className="text-sm font-bold text-[#F1F1F1] uppercase tracking-wider mb-5">
          Work History Portfolio
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {experiences.map((experience) => (
            <div
              key={experience._id}
              className="bg-[#1F1F1F] border border-[#282828] rounded-xl p-5 md:p-6 flex flex-col group transition-all hover:border-[#3EA6FF]/50 hover:bg-[#252525] relative overflow-hidden"
            >
              {/* Left Highlight Bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#282828] group-hover:bg-[#3EA6FF] transition-colors" />

              {/* Header Info */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-[#F1F1F1]">
                    {experience.position}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <FiBriefcase className="text-[#3EA6FF] h-3.5 w-3.5" />
                    <p className="text-sm font-medium text-[#AAAAAA]">
                      {experience.company}
                    </p>
                  </div>
                </div>

                {/* Styled Dates using Moment.js */}
                <div className="text-right shrink-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0F0F0F] border border-[#282828] text-xs font-mono font-bold text-[#AAAAAA]">
                    <FiCalendar className="text-[#717171] h-3 w-3" />
                    {moment(experience.startDate).format("MMM YYYY")}
                    <span className="text-[#717171] font-normal mx-0.5">→</span>
                    <span
                      className={!experience.endDate ? "text-[#3EA6FF]" : ""}
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
                <p className="text-sm text-[#AAAAAA] leading-relaxed line-clamp-3">
                  {experience.description}
                </p>
              </div>

              {/* Action Footer */}
              <div className="mt-5 pt-4 border-t border-[#282828] flex justify-end">
                <button
                  onClick={() => deleteExperience(experience._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-[#AAAAAA] uppercase tracking-wider rounded-lg hover:text-[#FF4E4E] hover:bg-[#FF4E4E]/10 transition-colors cursor-pointer focus:outline-none"
                >
                  <FiTrash2 className="h-3.5 w-3.5" /> Delete Role
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;