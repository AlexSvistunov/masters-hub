import { useEffect, useState } from "react";
import BusinessLayout from "../../components/business/BusinessLayout";
import URL from "../../utils/backend-url";
import useAuth from "../../hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";
import { DayPicker } from "react-day-picker";

const BusinessRecordingPage = () => {
  const { currentToken } = useAuth();

  const spec = "master";

  const [selectedDays, setSelectedDays] = useState([]);
  const [selected, setSelected] = useState(new Date());

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
      {spec === "master" && (
        <div className="flex">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(day) => setSelectedDays(day)}
          />

          <div>
            
          </div>
        </div>
      )}
    </BusinessLayout>
  );
};

export default BusinessRecordingPage;
