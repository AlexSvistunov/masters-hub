import { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import useAuth from "../hooks/useAuth";
import { URL } from "../utils/backend-url";
import { Link } from "react-router-dom";

const NotesPage = () => {
  const { token, currentToken } = useAuth();

  const [myRecording, setMyRecording] = useState([]);

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
      console.log(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <div className="container mx-auto">
        <Tabs />

        <div className="py-10 text-center">
          {!token && (
            <div className="text-center text-4xl">
              Авторизируйтесь чтобы посмотреть ваши записи
            </div>
          )}

          {token && (
            <div className="p-5">
              <span className="text-3xl text-center">
                У вас нет текущих записей! Запишитесь к мастеру или к
                специалисту
              </span>
            </div>
          )}

          {myRecording.map((recording) => (
            <>
              <div>Запись на {recording.date}</div>
              <div><Link>Профиль мастера / студии</Link></div>
              <div>Услуга {recording.service.title}</div>
              <div>Время начала {recording.time_start} </div>
              <div>Время конца {recording.time_end} </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
