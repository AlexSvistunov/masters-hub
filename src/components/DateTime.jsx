const DateTime = ({ setStep, step, time, setTime }) => {

  console.log('time', time)
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

      {time ? <div className="flex items-center justify-center gap-2 flex-wrap my-4">
        {time.map(timeSlot => (
          <div className="border border-primary p-2 rounded-md cursor-pointer" key={timeSlot}>
            {timeSlot}
          </div>
        ))}  
      </div> : <h3 className="text-center text-2xl">Нет окошек</h3>}
    </div>
   
  );
};

export default DateTime;
