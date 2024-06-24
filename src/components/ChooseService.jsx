import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { URL } from "../utils/backend-url";
import ServiceItem from "./ServiceItem";
import { MoonLoader } from "react-spinners";

const ChooseService = (props) => {
  const [isChosen, setIsChosen] = useState(false);
  const [enrollServices, setEnrollServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentToken } = useAuth();

  const getEnrollServices = async () => {
    try {
      const response = await fetch(`${URL}/api/recording/${props.id}/`, {
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

  useEffect(() => {
    setTimeout(() => {
      getEnrollServices();
    }, 500);
  }, []);

  // if(!enrollServices.length) {
  //   return (
  //     <div className="flex justify-center items-center text-3xl w-full h-full">Ничего не найдено!</div>
  //   )
  // }

  return (
    <>
      <div className="flex justify-between items-center">
        <button onClick={() => props.setStep(props.step - 1)}>
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

        <span className="inline-block mx-auto">{props.array[props.step]}</span>

        {/* <button onClick={props.nextStep}>
          <svg
            className="h-6 w-6 fill-current md:h-8 md:w-8"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
          </svg>
        </button> */}
      </div>

     

      <div>
        <div className="py-5">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>

        {isLoading && (
        <div className="flex items-center justify-center py-10">
          <MoonLoader color="#6a5bff" size={75}></MoonLoader>
        </div>
      )}

        <div className="share">
        <div className="flex items-center gap-4 my-4">
            {enrollServices.map((service, index) => (
              <button className="btn btn-primary" key={index}>
                {Object.keys(service)}
              </button>
            ))}
          </div>

          <div className="list flex flex-col gap-5">
            {enrollServices.map((enrollService, index) => (
              <div className="flex flex-col gap-3" key={index}>
                {Object.values(enrollService).map(
                  (enrollServiceArray, innerIndex) => (
                    <div key={innerIndex}>
                      <h3 className="text-3xl mb-2">
                        {Object.keys(enrollService)}
                      </h3>
                      <div className="flex flex-col gap-3">
                        {enrollServiceArray.map(
                          (enService, innerInnerIndex) => (
                            <ServiceItem
                              enService={enService}
                              key={innerInnerIndex}
                              step={props.step}
                              setStep={props.setStep}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseService;
