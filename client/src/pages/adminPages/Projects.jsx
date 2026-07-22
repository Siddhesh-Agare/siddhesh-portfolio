import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import useFetchProjects from "../../hooks/useFetchProjects";
import { useSelector } from "react-redux";
import {
  FiFolder,
  FiUploadCloud,
  FiTrash2,
  FiGithub,
  FiExternalLink,
  FiAlignLeft,
  FiInbox,
} from "react-icons/fi";

const DEFAULT_PREVIEW =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFmIddWvM22FtAnnhsGyn2ddCSxm-mdsNFdriLg_I_w&s=10";

const Projects = () => {
  const fetchProjecs = useFetchProjects();
  const [preview, setPreview] = useState(DEFAULT_PREVIEW);
  const [projectImage, setProjectImage] = useState(null);
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const { projects } = useSelector((state) => state.user);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProjectImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("github", github);
      formData.append("live", live);
      if (projectImage) {
        formData.append("projectImage", projectImage);
      }
      const response = await axios.post(
        `${serverUrl}/api/project/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message || "Project added successfully");
        fetchProjecs();
        setTitle("");
        setDescription("");
        setGithub("");
        setLive("");
        setProjectImage(null);
        setPreview(DEFAULT_PREVIEW);
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error in add project");
      toast.error(error?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/project/delete/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.success) {
        toast.success(
          response?.data?.message || "Project deleted successfully",
        );
        fetchProjecs();
      }
    } catch (error) {
      console.log(error, "error in delete project");
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchProjecs();
  }, [fetchProjecs]);

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-400/10 pb-5">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
            <FiFolder className="text-blue-400 h-5 w-5" />
            Projects Workspace
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Deploy, showcase, and manage your portfolio projects efficiently.
          </p>
        </div>
      </div>

      {/* Main Creation Form Surface — navy-blue glass panel */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-400/[0.09] bg-blue-950/20 backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/20 to-transparent" />
        <div className="border-b border-blue-400/10 bg-blue-950/20 p-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Launch New Project
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image Upload Area (Rectangular aspect ratio for projects) */}
            <div className="w-full lg:w-1/3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Project Thumbnail
              </label>
              <div className="relative group w-full aspect-video rounded-xl border-2 border-dashed border-blue-400/20 hover:border-blue-400/60 transition-all flex items-center justify-center overflow-hidden bg-blue-950/30">
                <img
                  src={preview}
                  alt="Project preview"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-150">
                  <FiUploadCloud className="text-white h-8 w-8 mb-2" />
                  <span className="text-xs text-white font-bold uppercase tracking-wider">
                    Upload Cover
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Core Details Inputs */}
            <div className="w-full lg:w-2/3 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Project Title
                </label>
                <div className="relative flex items-center">
                  <FiFolder className="absolute left-3.5 text-slate-500 h-4 w-4 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. Next.js E-Commerce App"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="w-full pl-10 pr-4 py-2.5 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm placeholder:text-slate-600 text-white transition-all outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Project Description
                </label>
                <div className="relative">
                  <FiAlignLeft className="absolute left-3.5 top-3.5 text-slate-500 h-4 w-4 pointer-events-none" />
                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Explain the architecture, features, and purpose..."
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="w-full pl-10 pr-4 py-3 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm placeholder:text-slate-600 text-white transition-all outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 resize-y"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    GitHub Link
                  </label>
                  <div className="relative flex items-center">
                    <FiGithub className="absolute left-3.5 text-slate-500 h-4 w-4 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="github.com/username/repo"
                      onChange={(e) => setGithub(e.target.value)}
                      value={github}
                      className="w-full pl-10 pr-4 py-2.5 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm placeholder:text-slate-600 text-white transition-all outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Live Demo Link
                  </label>
                  <div className="relative flex items-center">
                    <FiExternalLink className="absolute left-3.5 text-slate-500 h-4 w-4 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="https://your-project.vercel.app"
                      onChange={(e) => setLive(e.target.value)}
                      value={live}
                      className="w-full pl-10 pr-4 py-2.5 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm placeholder:text-slate-600 text-white transition-all outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Action Button */}
          <div className="pt-2 flex justify-end border-t border-blue-400/10 mt-6 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 disabled:bg-blue-500/20 disabled:text-slate-400/50 disabled:cursor-not-allowed text-[#020817] text-sm font-semibold h-11 rounded-lg transition-colors cursor-pointer focus:outline-none"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-[#020817]/30 border-t-[#020817] rounded-full animate-spin" />
              ) : (
                <span>Publish Project</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Projects Grid Display Section */}
      <div className="pt-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
          Active Projects Portfolio
        </h3>

        {projects?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence initial={false}>
              {projects.map((project) => (
                <motion.div
                  key={project?._id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="relative overflow-hidden rounded-2xl border border-blue-400/[0.09] bg-blue-950/20 backdrop-blur-xl flex flex-col group shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] transition-colors hover:border-blue-400/30 hover:bg-blue-950/30"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/15 to-transparent z-10" />

                  {/* Project Image Card */}
                  <div className="h-48 w-full bg-blue-950/30 border-b border-blue-400/10 overflow-hidden relative">
                    <img
                      src={project?.projectImage}
                      alt={project?.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Project Details */}
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="text-lg font-semibold text-white line-clamp-1">
                      {project?.title}
                    </h2>
                    <p className="text-sm text-slate-400 mt-2 line-clamp-3 flex-1">
                      {project?.description}
                    </p>

                    {/* Links Layout */}
                    <div className="mt-4 flex flex-col gap-2">
                      {project?.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-blue-950/30 px-3 py-1.5 rounded border border-blue-400/10 truncate transition-colors hover:text-blue-300 hover:border-blue-400/30"
                        >
                          <FiGithub className="shrink-0 text-blue-400" />
                          <span className="truncate">{project.github}</span>
                        </a>
                      ) : (
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-blue-950/20 px-3 py-1.5 rounded border border-blue-400/10 truncate">
                          <FiGithub className="shrink-0" />
                          <span className="truncate">No repository linked</span>
                        </div>
                      )}
                      {project?.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-blue-950/30 px-3 py-1.5 rounded border border-blue-400/10 truncate transition-colors hover:text-blue-300 hover:border-blue-400/30"
                        >
                          <FiExternalLink className="shrink-0 text-blue-400" />
                          <span className="truncate">{project.live}</span>
                        </a>
                      ) : (
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-blue-950/20 px-3 py-1.5 rounded border border-blue-400/10 truncate">
                          <FiExternalLink className="shrink-0" />
                          <span className="truncate">No live link available</span>
                        </div>
                      )}
                    </div>

                    {/* Action Footer */}
                    <div className="mt-5 pt-4 border-t border-blue-400/10 flex justify-end">
                      <button
                        onClick={() => handleDeleteProject(project?._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider rounded-lg hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer focus:outline-none"
                      >
                        <FiTrash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-blue-400/20 bg-blue-950/10 py-14 text-center">
            <FiInbox className="h-6 w-6 text-slate-500" />
            <p className="text-sm text-slate-400">No projects added yet.</p>
            <p className="text-xs text-slate-600">
              Use the form above to publish your first one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;