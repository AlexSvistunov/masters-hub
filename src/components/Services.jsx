import { openModal } from "../store/slices/modalSlice";
import { setId } from "../store/slices/modalSlice";
import { useDispatch } from "react-redux";
import EnrollModal from "./EnrollModal";
import useAuth from "../hooks/useAuth";

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import URL from "../utils/backend-url";

const Services = ({
  step,
  setStep,
  masterData,
  setStepProps,
  time,
  setTime,
  recordingSlots,
  setMasterData,
  keyword,
}) => {
  const dispatch = useDispatch();
  const { currentToken, token } = useAuth();
  const [modalActive, setModalActive] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const { id } = useParams();

  const getAllServices = async (id) => {
    try {
      const response = await fetch(`${URL}/api/services/${id}/`);
      const data = await response.json();
      setMasterData({ ...masterData, services: data });
      console.log(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  console.log(masterData);

  return (
    <div className="bg-base-200 p-5 rounded-2xl min-h-52 flex flex-col mb-5">
      <div className="flex gap-2 items-center mb-5">
        <h3 className="text-3xl">Услуги</h3>
        <span className="text-2xl text-primary">
          {masterData?.services_count}
          {/* {masterData?.services?.length} */}
        </span>
      </div>

      <div className="flex flex-col gap-6 mb-4">
        {masterData?.services?.map((service) => (
          <div
            className="flex p-6 px-6 flex-col tablet:flex-row bg-base-300 rounded-xl"
            key={service.id}
          >
            <div className="flex items-center">
              <img
                className="block mr-4 rounded-md h-14 w-14"
                src={`/backend/masterhub/${service.photo}`}
              ></img>

              <div className="flex flex-col">
                <span className="text-2xl">{service.title}</span>
                <span className="text-gray-500 text-xl">
                  {service.description}
                </span>
              </div>
            </div>

            <div className="mt-3 tablet:mt-0 tablet:ml-auto flex  gap-10 items-center">
              {keyword === 'worktime' && <Link className="btn btn-accent">Рабочее рвемя</Link>}
              <div className="text-gray-500">{service.price} RUB</div>
              <span className="text-gray-500">{service.time}</span>

              {keyword ? null : (
                <div
                  className="ml-auto tablet:ml-0 btn btn-primary"
                  onClick={() => {
                    if (!token) {
                      return;
                    }
                    dispatch(openModal());
                    dispatch(setId({ id: masterData?.id }));
                    setStep(2);
                    setModalActive(true);
                    setServiceId(service.id);
                  }}
                >
                  Записаться
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {masterData?.services_count > 5 && masterData?.services?.length <= 5 && (
        <div className="flex justify-center mt-auto">
          <button className="btn btn-ghost" onClick={() => getAllServices(id)}>
            Посмотреть все
          </button>
        </div>
      )}

      {keyword ? null : (
        <EnrollModal step={step} setStep={setStep} propWord={serviceId} />
      )}
    </div>
  );
};

// loading, error

export default Services;
