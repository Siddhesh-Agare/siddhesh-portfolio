import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setProjects } from "../redux/slices/userSlice.js";
const useFetchProjects = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const userId = import.meta.env.VITE_USER_ID;
  const dispatch = useDispatch();
  const fetchProjects = useCallback(async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/project/get-admin-projects/{$userId}`,
      );
      if (response?.data?.success) {
        dispatch(setProjects(response?.data?.projects));
        console.log(response?.data?.projects);
      }
    } catch (error) {
      console.log(error, "error in useFetchProjects");
    }
  }, [serverUrl, dispatch]);
  return fetchProjects;
};

export default useFetchProjects;