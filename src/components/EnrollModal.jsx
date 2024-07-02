import { useEffect, useState } from "react";
import ChooseService from "./ChooseService";
import { URL } from "../utils/backend-url";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../store/slices/modalSlice";
import DateTime from "./DateTime";

const EnrollModal = () => {
  const dispatch = useDispatch()

  const isModalOpen = useSelector(state => state.enrollModal.isModalOpen)
  const id = useSelector(state => state.enrollModal.modalId)

  const [enrollServices, setEnrollServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);
  
  const [time, setTime] = useState(null)
  console.log('time', time)

  console.log('ID', id);

  console.log(enrollServices);

  const { currentToken } = useAuth();
  const array = [
    "Новая запись",
    "Выбор услуг",
    "Услуга",
    "Дата и время",
    "Подтверждение записи",
  ];
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };


  const recordingSlots = async (masterId) => {
    console.log(id)
    console.log(masterId);
    try {
      const response = await fetch(`${URL}/api/recording/${id}/${masterId}/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${currentToken}`,
        },
      });
      const data = await response.json();
      setTime(data.time)
      console.log("RECODRING TEST", data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getEnrollServices = async () => {
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

  return (
    <>
      <div className="enroll-modal" open={isModalOpen ? true : false}>
        <div className="enroll-modal__box">
          {step === 0 && (
            <>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    dispatch(closeModal())

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

                <span className="block mx-auto">Заголовок</span>
              </div>

              <div className="py-5">
                <h3 className="text-3xl mb-4">Новая запись</h3>

                <button className="btn btn-primary" onClick={nextStep}>
                  Выбрать услуги
                </button>
              </div>
            </>
          )}

          {step === 1 && (
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

              />
            </>
          )}

          {step === 2 && (
            <>
              <DateTime setStep={setStep} step={step} time={time} setTime={setTime}/>

            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EnrollModal;
