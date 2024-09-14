import { useEffect } from "react";
import BusinessLayout from "../../components/business/BusinessLayout";
import URL from "../../utils/backend-url";
import useAuth from "../../hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";

const BusinessRecordingPage = () => {
  const { currentToken } = useAuth();

  const getRecording = async () => {
    try {
      const response = await fetch(`${URL}/api/admin-panel/recording/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${currentToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [getBusinessRecording, isLoading, error] = useFetch(getRecording);

  useEffect(() => {
    getBusinessRecording();
  }, []);

  return (
    <BusinessLayout>
      <h1 className="text-3xl mb-4">Записи</h1>
    </BusinessLayout>
  );
};

export default BusinessRecordingPage;
