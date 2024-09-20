import { useEffect, useState } from "react";
import BusinessLayout from "../../components/business/BusinessLayout";
import URL from "../../utils/backend-url";
import useAuth from "../../hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";
import { DayPicker } from "react-day-picker";
import { Link } from 'react-router-dom'
import BusinessSpecialists from '../../components/business/BusinessSpecialists'
import { MoonLoader } from 'react-spinners'

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

  const [specialists, setSpecialists] = useState([])


  const fetchSpecialists = async () => {
    const response = await fetch(`${URL}/api/admin-panel/specialist/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${currentToken}`,
      },
    });
    if (!response.ok)
      if(response.status === 404) {
        throw new Error(
          "Нет профиля! Создайте профиль чтобы создавать специалистов"
        )
      } else {
        throw new Error(
          "Something went wrong"
        )
      }
   
    const data = await response.json();
    console.log(data)
    setSpecialists(data);
    return data;
  };

  const [getSpecialists, specialistLoading, specError] = useFetch(fetchSpecialists);

  useEffect(() => {
    getSpecialists();
  }, []);
  

  useEffect(() => {
    getBusinessRecording();
  }, []);

  return (
    <BusinessLayout>
      <h1 className="text-3xl mb-4">Записи</h1>
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
            {!specialists.length &&  <Link to="/business/specialists/create" className="btn btn-accent self-start">
              Создать специалиста
            </Link>}
            {specialists?.map((specialist) => (
              <BusinessSpecialists
                key={specialist.id}
                specialist={specialist}
                keyword={"recording"}
              />
            ))}
          </div>
          
        </>
      )}
      {/* {spec === "master" && (
        <div className="flex">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(day) => setSelectedDays(day)}
          />

          <div>
            
          </div>
        </div>
      )} */}
    </BusinessLayout>
  );
};

export default BusinessRecordingPage;
