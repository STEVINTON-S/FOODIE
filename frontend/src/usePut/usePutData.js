import { useState } from 'react';
import axios from 'axios';

const usePostData = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (data) => {
    setIsLoading(true);
    try {
<<<<<<< HEAD
      const response = await axios.post(url, data);
      console.log("Data inserted");
=======
      const response = await axios.post(url, data)
        .then(() => console.log("data inserted"))
>>>>>>> 8ba84e33e6264d90c231a394e4e23d4c5755e399
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
<<<<<<< HEAD
      setError(error.response?.data?.message || error.message);
=======
      setError(error.message);
>>>>>>> 8ba84e33e6264d90c231a394e4e23d4c5755e399
      throw error;
    }
  };

  return { postData, isLoading, error };
};

export default usePostData;
