import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setReviews } from "../redux/slices/userSlice.js";

const useFetchReviews = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();
  const userId = import.meta.env.VITE_USER_ID;

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/review/get/${userId}`);

      if (response?.data?.success) {
        dispatch(setReviews(response.data.reviews));
        console.log(response.data.reviews);
      }
    } catch (error) {
      console.log("error in fetchReviews:", error);
    }
  }, [serverUrl, dispatch, userId]);

  return fetchReviews;
};

export default useFetchReviews;