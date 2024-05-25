import { useState } from "react";

const ChooseService = (props) => {
  const [isChosen, setIsChosen] = useState(false);

  return (
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

        <span>{props.array[props.step]}</span>

        <button onClick={props.nextStep}>
          <svg
            className="h-6 w-6 fill-current md:h-8 md:w-8"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
          </svg>
        </button>
      </div>

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

      <div className="list flex flex-col gap-3">
        <div className="item rounded-lg bg-primary p-3 text-white">
          <div className="flex gap-2 items-center mb-2">
            <img
              src="https://dikidi.ru/assets/images/newrecord/bg-service-icon.svg"
              alt=""
            />
            <h3>Покрытие гелем</h3>
          </div>

          <div className="flex gap-1 flex-col mb-2">
            <span>1700 rub</span>
            <span>2 часа</span>
          </div>

          <div className="flex justify-end">
            <button>Выбрать</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseService;
