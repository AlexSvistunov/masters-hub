import { useState } from "react";

export const useFetch = (fetchCallback) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetch = async () => {
    try {
      await fetchCallback();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetch, isLoading, error];
};
