import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSkills } from "../redux/slices/userSlice.js";
const useFetchSkills = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();
  const fetchSkills = useCallback(async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/skill/get-skills-admin`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response?.data?.success) {
        dispatch(setSkills(response?.data?.skills));
      }
    } catch (error) {
      console.log(error, "error in useFetchSkills");
    }
  }, [serverUrl, dispatch]);
  return fetchSkills;
};

export default useFetchSkills;