import { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import useAuth from "../hooks/useAuth";
import URL from "../utils/backend-url";
import { Link } from "react-router-dom";
import Recording from "../components/Recording";
import { MoonLoader } from "react-spinners";

const RecordingPage = () => {
  const { token, currentToken } = useAuth();

  const [myRecording, setMyRecording] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getNotes = async () => {
    try {
      const response = await fetch(`${URL}/api/recording/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${currentToken}`,
        },
      });
      const data = await response.json();
      setMyRecording(data);
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.error("An error occurred:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <div className="container mx-auto min-h-screen">
        <Tabs />

        <div className="py-10 text-center">

          {!token && (
            <div className="text-center text-4xl">
              Авторизируйтесь чтобы посмотреть ваши записи
            </div>
          )}

          {token && (
            <div className="flex flex-col gap-4">
            {isLoading ? (
              <div className="flex items-center justify-center p-10">
                <MoonLoader color="#6a5bff" size={75}/>
              </div>
            ) : (
              <>
                {myRecording.length ? (
                  myRecording.map((recording) => (
                    <Recording recording={recording} />
                  ))
                ) : (
                  <h3 className="text-4xl text-center">У вас нет текущих записей!</h3>
                )}
              </>
            )}
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordingPage;
