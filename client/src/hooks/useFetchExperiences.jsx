import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setExperiences } from "../redux/slices/userSlice.js";
const useFetchExperieces = () => {
  const token = localStorage.getItem("token");
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();

  const fetchExperiences = useCallback(async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/experience/get-admin-experiences`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.data?.success) {
        dispatch(setExperiences(response?.data?.experiences));
        console.log(response?.data?.skills);
      }
    } catch (error) {
      console.log(error, "error in fetchExperiences");
    }
  }, [serverUrl, token, dispatch]);
  return fetchExperiences;
};

export default useFetchExperieces;