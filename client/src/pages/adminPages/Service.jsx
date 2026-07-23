import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import useFetchServices from "../../hooks/useFetchServices";
import { useSelector } from "react-redux";
import {
  FiBox,
  FiDollarSign,
  FiClock,
  FiImage,
  FiTrash2,
  FiUploadCloud,
  FiTag,
  FiAlignLeft,
} from "react-icons/fi";

const Service = () => {
  const fetchServices = useFetchServices();
  const { services } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    deliveryTime: "",
    price: "",
  });

  const [serviceImage, setServiceImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setServiceImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const serviceData = new FormData();

    serviceData.append("title", formData.title);
    serviceData.append("description", formData.description);
    serviceData.append("category", formData.category);
    serviceData.append("deliveryTime", formData.deliveryTime);
    serviceData.append("price", formData.price);
    if (serviceImage) serviceData.append("serviceImage", serviceImage);

    try {
      const response = await axios.post(
        `${serverUrl}/api/service/add`,
        serviceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message || "Service added successfully");
        setFormData({
          title: "",
          description: "",
          category: "",
          deliveryTime: "",
          price: "",
        });

        fetchServices();
        setServiceImage(null);
        setPreview("");
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error in addService");
      toast.error(error?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/service/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.success) {
        toast.success(
          response?.data?.message || "Service deleted successfully",
        );
        fetchServices();
      }
    } catch (error) {
      console.log(error, "error in deleteService");
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <div className="space-y-6">
      {/* YT Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#282828] pb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#F1F1F1] tracking-tight flex items-center gap-2">
            <FiBox className="text-[#3EA6FF] h-5 w-5" />
            Services Workspace
          </h1>
          <p className="text-xs text-[#AAAAAA] mt-1">
            Manage your offerings, pricing, and delivery timelines.
          </p>
        </div>
      </div>

      {/* Creation Form Surface */}
      <div className="bg-[#1F1F1F] border border-[#282828] rounded-xl overflow-hidden">
        <div className="border-b border-[#282828] bg-[#161616]/60 p-5">
          <h3 className="text-sm font-bold text-[#F1F1F1] uppercase tracking-wider">
            Create New Service
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* Dark Theme Image Upload Zone */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
              Service Thumbnail
            </label>
            <div className="relative group">
              <input
                type="file"
                name="serviceImage"
                id="serviceImage"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                accept="image/*"
              />
              <div
                className={`w-full flex flex-col items-center justify-center border border-dashed rounded-xl transition-all ${preview ? "border-[#3EA6FF] bg-[#0F0F0F] py-4" : "border-[#282828] bg-[#0F0F0F] group-hover:bg-[#252525] group-hover:border-[#606060] py-10"}`}
              >
                {preview ? (
                  <div className="relative w-full max-w-[180px] rounded-lg overflow-hidden border border-[#282828]">
                    <img
                      src={preview}
                      alt="service preview"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0F0F0F]/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[#F1F1F1] text-xs font-semibold flex items-center gap-1.5">
                        <FiUploadCloud /> Change
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <FiImage className="h-8 w-8 text-[#717171] mb-2" />
                    <p className="text-sm font-medium text-[#AAAAAA]">
                      Click or drag to upload image
                    </p>
                    <p className="text-[11px] text-[#606060] mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                Service Title
              </label>
              <div className="relative flex items-center">
                <FiBox className="absolute left-3.5 text-[#717171] h-4 w-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Full Stack Web Development"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm placeholder:text-[#606060] text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF]"
                  required
                />
              </div>
            </div>

            {/* Category Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                Category
              </label>
              <div className="relative flex items-center">
                <FiTag className="absolute left-3.5 text-[#717171] h-4 w-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Web Development"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm placeholder:text-[#606060] text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF]"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Time Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                Delivery Time
              </label>
              <div className="relative flex items-center">
                <FiClock className="absolute left-3.5 text-[#717171] h-4 w-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. 7 Days"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm placeholder:text-[#606060] text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF]"
                  required
                />
              </div>
            </div>

            {/* Price Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                Price
              </label>
              <div className="relative flex items-center">
                <FiDollarSign className="absolute left-3.5 text-[#717171] h-4 w-4 pointer-events-none" />
                <input
                  type="number"
                  placeholder="e.g. 500"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm placeholder:text-[#606060] text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description Textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
              Service Description
            </label>
            <div className="relative">
              <FiAlignLeft className="absolute left-3.5 top-3.5 text-[#717171] h-4 w-4 pointer-events-none" />
              <textarea
                name="description"
                rows="4"
                placeholder="Detail what is included in this service..."
                value={formData.description}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-[#0F0F0F] border border-[#282828] rounded-xl text-sm placeholder:text-[#606060] text-[#F1F1F1] transition-all outline-none focus:border-[#3EA6FF] resize-y"
                required
              ></textarea>
            </div>
          </div>

          {/* Core Action Button */}
          <div className="pt-2 flex justify-end border-t border-[#282828] mt-6 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 flex items-center justify-center gap-2 bg-[#3EA6FF] hover:bg-[#65B8FF] disabled:bg-[#3EA6FF]/20 disabled:text-[#AAAAAA]/50 disabled:cursor-not-allowed text-[#0F0F0F] text-sm font-semibold h-11 rounded-lg transition-colors cursor-pointer focus:outline-none"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-[#0F0F0F]/30 border-t-[#0F0F0F] rounded-full animate-spin" />
              ) : (
                <span>Publish Service</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Services Grid */}
      <div className="pt-4">
        <h3 className="text-sm font-bold text-[#F1F1F1] uppercase tracking-wider mb-5">
          Active Services
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services?.map((service) => (
            <div
              key={service?._id}
              className="bg-[#1F1F1F] border border-[#282828] rounded-xl flex flex-col group transition-all hover:border-[#3EA6FF]/50 hover:bg-[#252525] overflow-hidden"
            >
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-[#0F0F0F] border border-[#282828] text-[10px] font-bold text-[#AAAAAA] uppercase tracking-wider">
                    {service?.category}
                  </span>
                  <span className="text-base font-bold text-[#3EA6FF]">
                    ${service?.price}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-[#F1F1F1] leading-tight mb-2">
                  {service?.title}
                </h2>

                <p className="text-sm text-[#AAAAAA] line-clamp-3 leading-relaxed">
                  {service?.description}
                </p>

                <div className="flex items-center gap-1.5 mt-4 text-[11px] font-bold text-[#AAAAAA] uppercase tracking-wider">
                  <FiClock className="h-3.5 w-3.5" />
                  <span>Delivery: {service?.deliveryTime}</span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-5 py-3 border-t border-[#282828] bg-[#161616]/40 flex justify-end">
                <button
                  onClick={() => deleteService(service?._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-[#AAAAAA] uppercase tracking-wider rounded-lg hover:text-[#FF4E4E] hover:bg-[#FF4E4E]/10 transition-colors cursor-pointer focus:outline-none"
                >
                  <FiTrash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;