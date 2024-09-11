import { useState } from "react";

export const useFetch = (fetchCallback) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null)

  const fetch = async () => {
    try {
      const result = await fetchCallback();
      console.log(result)
      setData(result)
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetch, isLoading, error, data, setData];
};
