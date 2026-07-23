import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import useFetchEducation from "../../hooks/useFetchEducation";
import { useSelector } from "react-redux";
import moment from "moment";
import { FiBookOpen, FiAward, FiCalendar, FiTrash2, FiInbox } from "react-icons/fi";

const Education = () => {
  const fetchEducations = useFetchEducation();
  const { educations } = useSelector((state) => state.user);
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/education/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.success) {
        toast.success(
          response?.data?.message || "Education added successfully",
        );
        fetchEducations();
        setFormData({
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error in handleSubmit");
      toast.error(error?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const deleteEducation = async (id) => {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/education/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.success) {
        toast.success(
          response?.data?.message || "Education deleted successfully",
        );
        fetchEducations();
      }
    } catch (error) {
      console.log(error, "error in deleteEducation");
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchEducations();
  }, [fetchEducations]);

  return (
    <div className="space-y-6">
      {/* Premium Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-400/10 pb-5">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
            <FiBookOpen className="text-blue-400 h-5 w-5" />
            Education Hub
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your academic credentials and qualifications.
          </p>
        </div>
      </div>

      {/* Modern Creation Form Surface — navy-blue glass panel */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-400/[0.09] bg-blue-950/20 backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/20 to-transparent" />
        <div className="border-b border-blue-400/10 bg-blue-950/20 p-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Add Academic Record
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Institution Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Institution Name
              </label>
              <div className="relative flex items-center">
                <FiBookOpen className="absolute left-3.5 text-slate-500 h-4 w-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Mumbai University"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm placeholder:text-slate-600 text-white transition-all outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20"
                  required
                />
              </div>
            </div>

            {/* Degree Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Degree / Field of Study
              </label>
              <div className="relative flex items-center">
                <FiAward className="absolute left-3.5 text-slate-500 h-4 w-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. BSc IT"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm placeholder:text-slate-600 text-white transition-all outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm text-white transition-all outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 [&::-webkit-calendar-picker-indicator]:invert-[0.8]"
                required
              />
            </div>

            {/* End Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                End Date{" "}
                <span className="text-slate-600 lowercase font-normal tracking-normal">
                  (Or expected)
                </span>
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm text-white transition-all outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 [&::-webkit-calendar-picker-indicator]:invert-[0.8]"
              />
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
                <span>Add Education</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Education Cards Display Section */}
      <div className="pt-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
          Academic Profile
        </h3>

        {educations?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <AnimatePresence initial={false}>
              {educations.map((education) => (
                <motion.div
                  key={education?._id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="relative overflow-hidden rounded-2xl border border-blue-400/[0.09] bg-blue-950/20 backdrop-blur-xl p-5 flex flex-col group shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] transition-colors hover:border-blue-400/30 hover:bg-blue-950/30"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/15 to-transparent" />

                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-white line-clamp-2">
                        {education?.school}
                      </h2>
                      <div className="flex items-center gap-2 mt-1.5">
                        <FiAward className="text-blue-400 shrink-0 h-4 w-4" />
                        <h3 className="text-sm font-medium text-slate-400 line-clamp-1">
                          {education?.degree}
                        </h3>
                      </div>
                    </div>

                    {/* Moment.js Formatted Date Badge */}
                    <div className="flex items-center gap-1.5 bg-blue-950/30 border border-blue-400/10 px-2.5 py-1 rounded-md shrink-0">
                      <FiCalendar className="text-slate-400 h-3 w-3" />
                      <span className="text-[11px] font-mono font-bold text-slate-400 tracking-tight">
                        {education?.startDate
                          ? moment(education.startDate).format("MMM YYYY")
                          : "N/A"}{" "}
                        -{" "}
                        {education?.endDate
                          ? moment(education.endDate).format("MMM YYYY")
                          : "Present"}
                      </span>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="mt-5 pt-4 border-t border-blue-400/10 flex justify-end">
                    <button
                      onClick={() => deleteEducation(education?._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider rounded-lg hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer focus:outline-none"
                    >
                      <FiTrash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-blue-400/20 bg-blue-950/10 py-14 text-center">
            <FiInbox className="h-6 w-6 text-slate-500" />
            <p className="text-sm text-slate-400">No education added yet.</p>
            <p className="text-xs text-slate-600">
              Use the form above to add your first academic record.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;