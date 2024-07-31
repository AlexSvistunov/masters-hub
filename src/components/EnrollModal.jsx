import { useEffect, useState } from "react";
import ChooseService from "./ChooseService";
import  URL  from "../utils/backend-url";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../store/slices/modalSlice";
import DateTime from "./DateTime";

import "react-datepicker/dist/react-datepicker.css";

const EnrollModal = ({ step, setStep, propWord }) => {
  const dispatch = useDispatch();
  const { currentToken } = useAuth();

  const [enrollServices, setEnrollServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isModalOpen = useSelector((state) => state.enrollModal.isModalOpen);
  const id = useSelector((state) => state.enrollModal.modalId);

  const [time, setTime] = useState(null);
  const [chosenTime, setChosenTime] = useState(null);
  const [chosenService, setChosenService] = useState(null);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");

  const [startDate, setStartDate] = useState(new Date());

  const array = [
    "Новая запись",
    "Выбор услуг",
    "Услуга",
    "Дата и время",
    "Подтверждение записи",
  ];

  useEffect(() => {
    if (isModalOpen) {
      console.log('modal open')
      getEnrollServices(id);
    }

    return () => {
      setStep(0);
      console.log("UNMOUNT");
      // setTime(0)
      // setChosenService(null)
      setEnrollServices([]);
    };
  }, [isModalOpen]);


  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const recordingSlots = async (serviceId, date) => {
    let currentDate = date;

    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, "0");
    let day = String(currentDate.getDate()).padStart(2, "0");

    let formattedDate = `${day}/${month}/${year}`;
    console.log(formattedDate);

    try {
      const currentDate = date ? `?date=${formattedDate}` : "";
      const response = await fetch(
        `${URL}/api/recording/${serviceId}/service/${currentDate}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${currentToken}`,
          },
        }
      );

      const data = await response.json();
      console.log("DATA", data);
      setTime(data.time);
      console.log("RECODRING TEST", data);
    } catch (error) {
      setTime(null);
      console.log(error.message);
    }
  };
  const getEnrollServices = async (id) => {
    try {
      const response = await fetch(`${URL}/api/recording/${id}/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${currentToken}`,
        },
      });

      const data = await response.json();
      setEnrollServices(data);
      setIsLoading(false);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const createEnrollment = async (service) => {
    let currentDate = startDate;
    currentDate.setDate(currentDate.getDate() - 1);

    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, "0");
    let day = String(currentDate.getDate()).padStart(2, "0");

    let formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);

    const obj = {
      profile: id,
      time: chosenTime,
      date: formattedDate,
      service: chosenService,
      name: name,
      surname: surname,
      phone: phone,
    };

    try {
      const response = await fetch(`${URL}/api/recording/`, {
        method: "POST",

        headers: {
          Authorization: `Token ${currentToken}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(obj),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    // если отличается от текущей даты, то
    if (isModalOpen && chosenService) {
      console.log(startDate);
      recordingSlots(chosenService, startDate);
    }
  }, [startDate, isModalOpen, chosenService]);

  return (
    <>
      <div
        className="enroll-modal"
        open={isModalOpen ? true : false}
        onClick={(e) => dispatch(closeModal())}
      >
        <div className="enroll-modal__box" onClick={(e) => e.stopPropagation()}>
          {step === 0 && (
            <>
              <ChooseService
                array={array}
                step={step}
                setStep={setStep}
                nextStep={nextStep}
                id={id}
                getEnrollServices={getEnrollServices}
                enrollServices={enrollServices}
                isLoading={isLoading}
                recordingSlots={recordingSlots}
                setChosenService={setChosenService}
              />
            </>
          )}

          {step === 1 && (
            <>
              <DateTime
                setStep={setStep}
                step={step}
                time={time}
                setTime={setTime}
                setChosenTime={setChosenTime}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex justify-between items-center mb-2">
                <button
                  onClick={() => {
                    setStep(step - 1);
                  }}
                >
                  <svg
                    className="h-6 w-6 fill-current md:h-8 md:w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                  </svg>
                </button>

                <span className="block mx-auto">Личные данные</span>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-4 my-4"
              >
                <input
                  type="text"
                  className="input input-bordered input-primary"
                  placeholder="Имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  className="input input-bordered input-primary"
                  placeholder="Фамилия"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
                <input
                  type="text"
                  className="input input-bordered input-primary"
                  placeholder="Телефон"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <button
                  className="btn btn-primary align-center"
                  onClick={createEnrollment}
                >
                  Записаться
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EnrollModal;
