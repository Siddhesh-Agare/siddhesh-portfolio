import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  FiUser,
  FiPhone,
  FiMessageCircle,
  FiMapPin,
  FiMap,
  FiGlobe,
  FiBriefcase,
  FiAlignLeft,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiYoutube,
  FiSave,
  FiUploadCloud,
  FiFileText,
  FiActivity,
} from "react-icons/fi";

let defaultProfileData = {
  name: "",
  phone: "",
  whatsappNumber: "",
  address: "",
  city: "",
  state: "",
  country: "",
  title: "",
  intro: "",
  description: "",
  github: "",
  linkedin: "",
  instagram: "",
  facebook: "",
  twitter: "",
  youtube: "",
};

// Reusable Input Component, restyled to the navy-blue glass theme
const InputField = ({ label, icon: Icon, type = "text", ...props }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-500 tracking-wide uppercase">
      {label}
    </label>
    <div className="relative flex items-center">
      <Icon className="absolute left-3.5 text-slate-500 h-4 w-4 pointer-events-none" />
      <input
        type={type}
        className="w-full pl-10 pr-4 py-2.5 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm placeholder:text-slate-600 text-white transition-all duration-150 outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20"
        {...props}
      />
    </div>
  </div>
);

const Profile = () => {
  const userData = useSelector((state) => state.user.userData);
  const [profileData, setProfileData] = useState(defaultProfileData);
  const [isAvailable, setIsAvailable] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [previewPic, setPreviewPic] = useState(
    "https://imgs.search.brave.com/GXgHI-990Bwz_US4KQvT4OfcjjF4ZApwO5aibqYpeFQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOC8w/NC8xOC8xOC81Ni91/c2VyLTMzMzEyNTZf/NjQwLnBuZw",
  );

  useEffect(() => {
    if (!userData) return;

    defaultProfileData = {
      name: userData.name || "",
      phone: userData.phone || "",
      whatsappNumber: userData.whatsappNumber || "",
      address: userData.address || "",
      city: userData.city || "",
      state: userData.state || "",
      country: userData.country || "",
      title: userData.title || "",
      intro: userData.intro || "",
      description: userData.description || "",
      github: userData.github || "",
      linkedin: userData.linkedin || "",
      instagram: userData.instagram || "",
      facebook: userData.facebook || "",
      twitter: userData.twitter || "",
      youtube: userData.youtube || "",
    };

    setProfileData(defaultProfileData);
    if (userData.profilePic) {
      setPreviewPic(userData.profilePic);
    }
    if (userData.isAvailable !== undefined) {
      setIsAvailable(userData.isAvailable);
    }
  }, [userData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsAvailable(e.target.checked);
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    setProfilePic(file);
    setPreviewPic(fileUrl);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(profileData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      formData.append("isAvailable", isAvailable);

      const response = await axios.put(
        `${serverUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response?.data?.success) {
        toast.success(
          response?.data?.message || "Profile updated successfully",
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-transparent flex justify-center relative overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">
      {/* Main Profile Card Surface — navy-blue glass panel, matching the rest of the admin shell */}
      <div className="w-full max-w-5xl relative overflow-hidden rounded-2xl border border-blue-400/[0.09] bg-blue-950/20 backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)] z-10">
        {/* Crystal sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/20 to-transparent" />

        {/* Header Section */}
        <div className="border-b border-blue-400/10 bg-blue-950/20 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 w-full md:w-auto">
            {/* Profile Picture Upload Area */}
            <div className="relative group w-24 h-24 md:w-28 md:h-28 rounded-2xl border-2 border-dashed border-blue-400/20 hover:border-blue-400/60 transition-all flex-shrink-0 flex items-center justify-center overflow-hidden bg-blue-950/40">
              <img
                src={previewPic}
                alt="Profile preview"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-150">
                <FiUploadCloud className="text-white h-6 w-6 mb-1" />
                <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                  Upload
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
                {profileData.name || "Your Profile"}
              </h2>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <FiActivity className="text-blue-400" /> Manage your public
                presence
              </p>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center bg-blue-950/30 px-4 py-3 rounded-xl border border-blue-400/10 w-full md:w-auto justify-between md:justify-start">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mr-4">
              Available for Hire
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isAvailable}
                onChange={handleCheckboxChange}
              />
              <div className="w-11 h-6 bg-blue-950/60 border border-blue-400/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-blue-950 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-transparent after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={onSubmitHandler} className="p-6 md:p-8 space-y-10">
          {/* Section 1: Basic Information */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <FiUser className="text-blue-400" /> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                icon={FiUser}
                name="name"
                value={profileData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
              <InputField
                label="Professional Title"
                icon={FiBriefcase}
                name="title"
                value={profileData.title}
                onChange={handleChange}
                placeholder="Full Stack Developer"
              />
              <InputField
                label="Phone Number"
                icon={FiPhone}
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 890"
              />
              <InputField
                label="WhatsApp Number"
                icon={FiMessageCircle}
                name="whatsappNumber"
                value={profileData.whatsappNumber}
                onChange={handleChange}
                placeholder="+1 234 567 890"
              />
            </div>
          </div>

          <hr className="border-blue-400/10" />

          {/* Section 2: Location */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <FiMapPin className="text-blue-400" /> Location Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2">
                <InputField
                  label="Street Address"
                  icon={FiMapPin}
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                />
              </div>
              <InputField
                label="City"
                icon={FiMap}
                name="city"
                value={profileData.city}
                onChange={handleChange}
                placeholder="New York"
              />
              <InputField
                label="State"
                icon={FiFileText}
                name="state"
                value={profileData.state}
                onChange={handleChange}
                placeholder="NY"
              />
              <InputField
                label="Country"
                icon={FiGlobe}
                name="country"
                value={profileData.country}
                onChange={handleChange}
                placeholder="USA"
              />
            </div>
          </div>

          <hr className="border-blue-400/10" />

          {/* Section 3: About */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <FiAlignLeft className="text-blue-400" /> About You
            </h3>
            <div className="space-y-6">
              <InputField
                label="Short Intro"
                icon={FiAlignLeft}
                name="intro"
                value={profileData.intro}
                onChange={handleChange}
                placeholder="I build modern web applications..."
              />

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 tracking-wide uppercase">
                  Full Description
                </label>
                <div className="relative">
                  <FiFileText className="absolute left-3.5 top-3.5 text-slate-400 h-4 w-4 pointer-events-none" />
                  <textarea
                    name="description"
                    value={profileData.description}
                    onChange={handleChange}
                    placeholder="Tell us more about your experience, skills, and background..."
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 bg-blue-950/30 border border-blue-400/10 rounded-xl text-sm placeholder:text-slate-600 text-white transition-all duration-150 outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 resize-y"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-blue-400/10" />

          {/* Section 4: Social Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <FiGlobe className="text-blue-400" /> Social Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField
                label="GitHub"
                icon={FiGithub}
                name="github"
                value={profileData.github}
                onChange={handleChange}
                placeholder="github.com/username"
              />
              <InputField
                label="LinkedIn"
                icon={FiLinkedin}
                name="linkedin"
                value={profileData.linkedin}
                onChange={handleChange}
                placeholder="linkedin.com/in/username"
              />
              <InputField
                label="Twitter"
                icon={FiTwitter}
                name="twitter"
                value={profileData.twitter}
                onChange={handleChange}
                placeholder="twitter.com/username"
              />
              <InputField
                label="Instagram"
                icon={FiInstagram}
                name="instagram"
                value={profileData.instagram}
                onChange={handleChange}
                placeholder="instagram.com/username"
              />
              <InputField
                label="Facebook"
                icon={FiFacebook}
                name="facebook"
                value={profileData.facebook}
                onChange={handleChange}
                placeholder="facebook.com/username"
              />
              <InputField
                label="YouTube"
                icon={FiYoutube}
                name="youtube"
                value={profileData.youtube}
                onChange={handleChange}
                placeholder="youtube.com/@username"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 disabled:bg-blue-500/20 disabled:text-slate-400/50 disabled:cursor-not-allowed text-[#020817] text-xs font-semibold h-10 rounded-lg transition-colors cursor-pointer focus:outline-none"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-[#020817]/30 border-t-[#020817] rounded-full animate-spin" />
              ) : (
                <>
                  <FiSave className="h-4 w-4" />
                  <span>Save Profile Settings</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;