import { useEffect, useRef, useState} from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/Header";
import Hero from "../components/sections/Hero";
import Tabs from "../components/ui/Tabs";

import useAuth from "../hooks/useAuth";
import { useFetch } from "../hooks/useFetch";

import Recording from "../components/Recording";
import { MoonLoader } from "react-spinners";

import scrollToRef from "../utils/scrollToRef";

import { deleteRecording, getRecording } from "../service/RecordingService";

const RecordingPage = () => {
  const { token, currentToken } = useAuth();

  const location = useLocation();
  const ref = useRef();
 
  const [getRecordingData, isLoading, error, myRecording, setMyRecording] = useFetch(() => getRecording(currentToken))
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
    if (token) {
      getRecordingData();
    }
  }, [token]);

  useEffect(() => {
    if (location.state === "dropdown") {
      scrollToRef(ref);
    }
  }, []);

  useEffect(() => {
    getSpecialists();
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <div className="container mx-auto min-h-screen px-5" ref={ref}>
        <Tabs />

        <div className="py-10 text-center">
          {!token ? (
            <div className="text-center text-4xl">
              Авторизируйтесь чтобы посмотреть ваши записи
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center p-10">
              <MoonLoader color="#6a5bff" size={75} />
            </div>
          ) : error ? (
            <p className="text-xl text-center">{error}</p>
          ) : (
            <div className="flex flex-col gap-4">
              {myRecording.map((recording) => (
                <Recording
                  recording={recording}
                  key={recording.id}
                  deleteRecording={() => deleteRecording(recording.id, currentToken, setMyRecording)}
                />
              ))}

              {myRecording.length === 0 && (
                <div className="tablet:text-4xl text-xl text-center">
                  У вас нет текущих записей!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// success || error alert
// confirm modal

export default RecordingPage;
