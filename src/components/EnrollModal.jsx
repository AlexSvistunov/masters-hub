import { useState } from "react";
import ChooseService from "./ChooseService";

const EnrollModal = ({isModalOpen}) => {
  const array = [
    "Новая запись",
    "Выбор услуг",
    "Услуга",
    "Дата и время",
    "Подтверждение записи",
  ];
  const [step, setStep] = useState(0);
  console.log(step);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <>
      <div className="enroll-modal" open={isModalOpen ? true : false}>
        <div className="enroll-modal__box">
          {step === 0 && (
            <>
              <div className="flex justify-between items-center">
                <button>
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
              <ChooseService array={array} step={step} setStep={setStep} nextStep={nextStep}/>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EnrollModal;
