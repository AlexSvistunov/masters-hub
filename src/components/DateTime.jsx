import DatePicker from "react-datepicker";
import { useState } from "react";
const DateTime = ({ setStep, step, time, setTime, setChosenTime, startDate, setStartDate }) => {


  return (
    <div>
      <div className="flex justify-between items-center">
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

        <span className="block mx-auto">Дата и время</span>
      </div>

      <div className="flex justify-center my-2">
        <DatePicker
          showIcon
          className="input input-bordered input-primary block w-full"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
          dateFormat="yyyy/MM/dd"
          minDate={new Date()}
          icon={
            <svg className="absolute top-2 right-2"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 48 48"
            >
              <mask id="ipSApplication0">
                <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="6">
                  <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                  <path
                    fill="#fff"
                    d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                  ></path>
                </g>
              </mask>
              <path
                fill="currentColor"
                d="M0 0h48v48H0z"
                mask="url(#ipSApplication0)"
              ></path>
            </svg>
          }
        />
      </div>

      {time ? (
        <div className="flex items-center justify-center gap-2 flex-wrap my-4">
          {time.map((timeSlot) => (
            <div
              className="border border-primary p-2 rounded-md cursor-pointer"
              key={timeSlot}
              onClick={() => {
                setStep(step + 1);
                setChosenTime(timeSlot);
              }}
            >
              {timeSlot}
            </div>
          ))}
        </div>
      ) : (
        <h3 className="text-center text-2xl">Нет окошек</h3>
      )}

      {/* bad request response instead of false!!! */}
    </div>
  );
};

export default DateTime;
