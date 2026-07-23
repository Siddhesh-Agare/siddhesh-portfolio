import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setExperiences } from "../redux/slices/userSlice.js";
const useFetchExperieces = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();
  const userId = import.meta.env.VITE_USER_ID;

  const fetchExperiences = useCallback(async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/experience/get-admin-experiences/{$userId}`,
      );
      if (response?.data?.success) {
        dispatch(setExperiences(response?.data?.experiences));
        console.log(response?.data?.skills);
      }
    } catch (error) {
      console.log(error, "error in fetchExperiences");
    }
  }, [serverUrl,dispatch]);
  return fetchExperiences;
};

export default useFetchExperieces;