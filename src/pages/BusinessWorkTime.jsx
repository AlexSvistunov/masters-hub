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
import { MoonLoader } from "react-spinners";

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
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Нет профиля или специалистов");
      } else {
        throw new Error("Something went wrong!");
      }
    }
    const data = await response.json();
    setSpecialists(data);
    return data;
  };

  const [getSpecialists, isLoading, error] = useFetch(fetchSpecialists);

  useEffect(() => {
    getSpecialists();
  }, []);

  return (
    <BusinessLayout>
      <h1 className="text-3xl mb-4">График специалистов</h1>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <MoonLoader color="#00cab6" size={75}></MoonLoader>
        </div>
      ) : error ? (
        <div className="flex flex-col gap-3 items-start">
          <div className="text-xl">{error}</div>
          <div className="flex gap-3">
            <Link to="/business/profile/creation" className="btn btn-accent">
              Создать профиль
            </Link>

            <Link to="/business/specialists" className="btn btn-accent">
              Мои специалисты
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-4 tablet:max-w-2xl max-w-full">
            {!specialist.length &&  <Link to="/business/specialists/create" className="btn btn-accent self-start">
              Создать специалиста
            </Link>}
            {specialist?.map((specialist) => (
              <BusinessSpecialists
                key={specialist.id}
                specialist={specialist}
                keyword={"worktime"}
              />
            ))}
          </div>
        </>
      )}
    </BusinessLayout>
  );
};

export default BusinessWorkTime;
