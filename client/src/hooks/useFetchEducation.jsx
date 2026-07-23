import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setEducations } from "../redux/slices/userSlice.js";
const useFetchEducation = () => {
  const token = localStorage.getItem("token");
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();

  const fetchEducation = useCallback(async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/education/get-admin-educations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.success) {
        dispatch(setEducations(response?.data?.educations));
        console.log(response?.data?.educations);
      }
    } catch (error) {
      console.log(error, "error in fetchEducation");
    }
  }, [serverUrl, token, dispatch]);
  return fetchEducation;
};

export default useFetchEducation;