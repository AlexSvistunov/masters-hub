import { DayPicker } from "react-day-picker";
import BusinessLayout from "../components/BusinessLayout";
import "react-day-picker/style.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import CustomDay from "../components/CustomDay";
import DayTooltip from "../components/DayTooltip";
import useAuth from "../hooks/useAuth";
import { useFetch } from "../hooks/useFetch";
import BusinessSpecialists from "../components/BusinessSpecialists";
import URL from "../utils/backend-url";

const BusinessWorkTime = () => {


  const { currentToken } = useAuth();
  const [specialist, setSpecialists] = useState([]);

  // date, timestart, timeend

  const fetchSpecialists = async () => {
    const response = await fetch(`${URL}/api/admin-panel/specialist/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${currentToken}`,
      },
    });
    if (!response.ok) throw new Error("something went wrong");
    const data = await response.json();
    setSpecialists(data);
    return data;
  };

  const [getSpecialists, isLoading, error] = useFetch(fetchSpecialists);

  useEffect(() => {
    getSpecialists();
  }, []);


  return (
    <div>
      <BusinessLayout>
        <div>
          <div className="flex flex-col gap-4 mb-4 tablet:max-w-2xl max-w-full">
            {specialist?.map((specialist) => (
              <BusinessSpecialists
                key={specialist.id}
                specialist={specialist}
                keyword={'worktime'}
              />
            ))}
          </div>
        </div>
      
      </BusinessLayout>
    </div>
  );
};

export default BusinessWorkTime;
