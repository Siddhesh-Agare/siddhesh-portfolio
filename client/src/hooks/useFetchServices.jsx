import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setServices } from "../redux/slices/userSlice.js";
const useFetchServices = () => {
  const token = localStorage.getItem("token");
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();

  const fetchServices = useCallback(async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/service/get-admin-services`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.success) {
        dispatch(setServices(response?.data?.services));
        console.log(response?.data?.services);
      }
    } catch (error) {
      console.log(error, "error in fetchServices");
    }
  }, [serverUrl, token, dispatch]);
  return fetchServices;
};

export default useFetchServices;