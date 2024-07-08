import { openModal } from "../store/slices/modalSlice";
import { setId } from "../store/slices/modalSlice";
import { useDispatch } from "react-redux";
import EnrollModal from "./EnrollModal";
import useAuth from "../hooks/useAuth";

const Services = ({ masterData, setStepProps, time, setTime }) => {
  const dispatch = useDispatch();
  const { currentToken } = useAuth();
  console.log(masterData)


  const recordingSlots = async (masterId) => {
    console.log(masterId);
    try {
      const response = await fetch(`${URL}/api/recording/${masterData.id}/${masterId}/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${currentToken}`,
        },
      });
      const data = await response.json();
      setTime(data.time);
      console.log("RECODRING TEST", data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-base-200 p-5 rounded-2xl min-h-64 flex flex-col mb-5">
      <div className="flex gap-2 items-center">
        <h3 className="text-3xl">Услуги</h3>
        <span className="text-2xl text-primary">
          {masterData?.services?.length}
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
                  dispatch(openModal());
                  dispatch(setId({id: masterData.id}))
                  recordingSlots(masterData.id)
                  // setStepProps(masterData.specialists[0].id)
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
    </div>
  );
};

export default Services;
