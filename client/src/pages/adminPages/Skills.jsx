import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import useFetchSkills from "../../hooks/useFetchSkills";
import { useSelector } from "react-redux";
import { FiUploadCloud, FiTrash2, FiCpu } from "react-icons/fi";

const Skills = () => {
  const fetchSkills = useFetchSkills();
  const { skills } = useSelector((state) => state.user);
  const [previewImage, setPreviewImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFmIddWvM22FtAnnhsGyn2ddCSxm-mdsNFdriLg_I_w&s=10",
  );
  const [skillImage, setSkillImage] = useState(null);
  const [skillLevel, setSkillLevel] = useState(0);
  const [skillName, setSkillName] = useState("");
  const [loading, setLoading] = useState(false);
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSkillImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skillName || !skillLevel) {
      toast.error("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("skillName", skillName);
      formData.append("skillLevel", skillLevel);
      if (!skillImage) {
        toast.error("Please upload a file");
        setLoading(false);
        return;
      }
      formData.append("skillImage", skillImage);
      const response = await axios.post(
        `${serverUrl}/api/skill/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message || "Skill added successfully");
        fetchSkills();
        // Reset form after successful submission
        setSkillName("");
        setSkillLevel(0);
        setSkillImage(null);
      }
      setLoading(false);
    } catch (error) {
      console.log(error, "error in add skill");
      toast.error(error?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const deleteSkill = async (skillId) => {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/skill/delete/${skillId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message || "Skill deleted successfully");
        fetchSkills();
      }
    } catch (error) {
      console.log(error, "error in delete skill");
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return (
    <div className="space-y-6">
      {/* Upper Content Control Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-400/10 pb-5">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
            <FiCpu className="text-blue-400 h-5 w-5" />
            Skills Workspace
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Add new technologies or manage your existing tech stack.
          </p>
        </div>
      </div>

      {/* Main Panel Input Surface — navy-blue glass panel */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-400/[0.09] bg-blue-950/20 backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/20 to-transparent" />
        <div className="border-b border-blue-400/10 bg-blue-950/20 p-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Add New Skill
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Image Upload Area (Matches Profile Page UI) */}
            <div className="relative group w-28 h-28 rounded-2xl border-2 border-dashed border-blue-400/20 hover:border-blue-400/60 transition-all flex-shrink-0 flex items-center justify-center overflow-hidden bg-blue-950/30">
              <img
                src={previewImage}
                alt="Skill preview"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 p-1"
              />
              <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-150">
                <FiUploadCloud className="text-white h-6 w-6 mb-1" />
                <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                  Upload Icon
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Inputs Section */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Text Input Block */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Skill Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js"
                  onChange={(e) => setSkillName(e.target.value)}
                  value={skillName}
                  className="w-full px-4 py-2.5 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm placeholder:text-slate-600 text-white transition-all outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20"
                />
              </div>

              {/* Range Slider Configuration Block */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Skill Level
                  </label>
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-400/20">
                    {skillLevel}%
                  </span>
                </div>
                <div className="pt-3">
                  <input
                    type="range"
                    name="skillLevel"
                    min="0"
                    max="100"
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                    className="w-full h-1.5 bg-blue-950/30 rounded-lg cursor-pointer appearance-none accent-blue-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Core Creation Action Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 disabled:bg-blue-500/20 disabled:text-slate-400/50 disabled:cursor-not-allowed text-[#020817] text-xs font-semibold h-10 rounded-lg transition-colors cursor-pointer focus:outline-none"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-[#020817]/30 border-t-[#020817] rounded-full animate-spin" />
              ) : (
                <span>Add Skill</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Header Separation for Skills Collection Grid */}
      <div className="pt-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
          Active Skills Portfolio
        </h3>

        {/* Dynamic Studio Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills?.map((skill) => (
            <div
              key={skill._id}
              className="relative overflow-hidden rounded-2xl border border-blue-400/[0.09] bg-blue-950/20 backdrop-blur-xl p-4 flex flex-col items-center justify-between text-center min-h-[190px] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] transition-all hover:border-blue-400/30 hover:bg-blue-950/30"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/15 to-transparent" />
              <img
                src={skill.skillImage}
                alt="skill-image"
                className="w-16 h-16 object-contain p-2 rounded-xl bg-blue-950/30 border border-blue-400/10"
              />
              <div className="mt-3 w-full">
                <h3 className="text-sm font-semibold text-white truncate px-1">
                  {skill.skillName}
                </h3>
                <p className="text-xs font-mono font-bold text-slate-400 mt-1">
                  Level:{" "}
                  <span className="text-blue-400">{skill.skillLevel}%</span>
                </p>
              </div>

              <button
                onClick={() => deleteSkill(skill._id)}
                className="mt-4 flex items-center justify-center gap-1.5 px-2 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-blue-950/30 border border-blue-400/10 rounded-lg hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-400/20 transition-all cursor-pointer w-full"
              >
                <FiTrash2 className="h-3 w-3" /> Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;