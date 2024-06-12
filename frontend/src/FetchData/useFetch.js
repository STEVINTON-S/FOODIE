import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const res = await axios.get(url, { cancelToken: source.token });
        setData(res.data);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled");
        } else {
          setIsLoading(false);
          setError(err.message);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      source.cancel("Request canceled by cleanup");
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
