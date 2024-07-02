const ServiceItem = ({ enService, step, setStep, recordingTest }) => {

  return (
    <div className="item rounded-lg bg-base-300 p-3">
      <div className="flex gap-6 items-center mb-2">
        <img
          src={`/backend/masterhub${enService.photo}`}
          alt=""
          className="w-16 h-16 object-cover rounded-lg"
        />
        <h3 className="text-2xl">{enService.title}</h3>
      </div>

      <div className="mt-auto flex justify-between items-center">
        <div className="flex gap-1 flex-col mb-2">
          <span className=" text-slate-500 text-xl">{enService.price} RUB</span>
          {/* <span>2 часа</span> */}
        </div>

        <div className="flex justify-end">
          <button
            className="btn btn-primary text-base"
            onClick={() => {
              setStep(step + 1);
              recordingTest(enService?.id);
            }}
          >
            Выбрать
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
