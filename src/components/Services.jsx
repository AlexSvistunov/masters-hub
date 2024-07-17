import { openModal } from "../store/slices/modalSlice";
import { setId } from "../store/slices/modalSlice";
import { useDispatch } from "react-redux";
import EnrollModal from "./EnrollModal";
import useAuth from "../hooks/useAuth";

import {URL} from '../utils/backend-url.js'
import { useState } from "react";
import { useParams } from "react-router-dom";


const Services = ({step, setStep, masterData, setStepProps, time, setTime, recordingSlots }) => {

  const dispatch = useDispatch();
  const { currentToken, token } = useAuth();

  const [modalActive, setModalActive] = useState(false)
  const [serviceId, setServiceId] = useState(null)

  // const {id} = useParams()
  // console.log(id)

  

  console.log(masterData)

  return (
    <div className="bg-base-200 p-5 rounded-2xl min-h-64 flex flex-col mb-5">
      <div className="flex gap-2 items-center">
        <h3 className="text-3xl">Услуги</h3>
        <span className="text-2xl text-primary">
          {masterData?.services_count}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {masterData?.services?.map((service) => (
          <div
            className="flex my-5 flex-col tablet:flex-row"
            key={service.title}
          >
            <div className="flex items-center">
              <img
                className="block mr-4 rounded-md h-12 w-12"
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
              <div className="text-gray-500">{service.price} RUB</div>
              <span className="text-gray-500">{service.time}</span>

              <div
                className="ml-auto tablet:ml-0 btn btn-primary"
                onClick={() => {
                  if(!token) {
                    return
                  }
                  dispatch(openModal());
                  dispatch(setId({id: masterData?.id}))
                  setStep(2)
                  setModalActive(true)
                  setServiceId(service.id)
                  
                  // recordingSlots(service.id)
                  // setStepProps(masterData.specialists[0].id)
                  // может какой-то пропс в dispatch с шагом???
                }}
              >
                Записаться

                
              </div>

             
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-auto">
        <button className="btn btn-ghost">Посмотреть все</button>
      </div>
      <EnrollModal step={step} setStep={setStep} propWord={serviceId}/>
  

     
    </div>

  );
};

export default Services;
