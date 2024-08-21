import { useEffect, useState } from "react";
import ServiceItem from "./ServiceItem";
import { MoonLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../store/slices/modalSlice";

const ChooseService = (props) => {
  console.log(props)
  const isModalOpen = useSelector((state) => state.enrollModal.isModalOpen);
  const dispatch = useDispatch();
  
  const [inputValue, setInputValue] = useState("");
  const [searchedServices, setSearchedServices] = useState([]);

  const onSearchHandler = (e) => {
    setInputValue(e.target.value);

    const searchedList = [];

    props.enrollServices.forEach((service) => {
      console.log(service)
      Object.values(service).forEach((innerService) => {
        const searchResults = innerService.filter((el) =>
          el.title.toLowerCase().includes(e.target.value.toLowerCase()) && e.target.value !== ' '
        );
        searchedList.push(...searchResults);
      });
    });

    console.log("searchedlist", searchedList);

    setSearchedServices(searchedList);
  };

  const clearStates = () => {
    setSearchedServices([])
    setInputValue('')
  }


  useEffect(() => {
    return () => {
      clearStates()
    }
  },[isModalOpen])

  console.log(searchedServices)


  return (
    <>
      <div className="flex justify-between items-center">
        <button onClick={() => dispatch(closeModal())}>
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

      </div>

      <div>
        <div className="py-5">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={inputValue}
              onChange={onSearchHandler}
            />
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

        {props.isLoading && (
          <div className="flex items-center justify-center py-10">
            <MoonLoader color="#6a5bff" size={75}></MoonLoader>
          </div>
        )}

        <div className="share">
          <div className="flex items-center gap-4 my-4">
            {props.enrollServices.map((service, index) => (
              <button className="btn btn-primary" key={index}>
                {Object.keys(service)}
              </button>
            ))}
          </div>

          <div className="list flex flex-col gap-5">
            {searchedServices.length && inputValue
              ? searchedServices.map((searchedService, index) => (
                  <ServiceItem
                    enService={searchedService}
                    key={index}
                    step={props.step}
                    setStep={props.setStep}
                    recordingSlots={props.recordingSlots}
                    setChosenService={props.setChosenService}
                  />
                ))
              : props.enrollServices.map((enrollService, index) => (
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
                                  recordingSlots={props.recordingSlots}
                                  setChosenService={props.setChosenService}
                                  
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
