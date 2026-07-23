import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/slices/userSlice.js";
const useFetchUserData = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();
  const userId = import.meta.env.VITE_USER_ID;
  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/user/current-user/${userId}`,
      );
      if (response?.data?.success) {
        dispatch(setUserData(response?.data?.user));
        console.log(response?.data?.user);
      }
    } catch (error) {
      console.log(error, "error in fetchUserData");
    }
  }, [serverUrl, dispatch]);
  return fetchUserData;
};

export default useFetchUserData;