import { useState } from 'react';
import axios from 'axios';

const usePostData = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, data);
      console.log("Data inserted");
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.message || error.message);
      throw error;
    }
  };

  return { postData, isLoading, error };
};

export default usePostData;
