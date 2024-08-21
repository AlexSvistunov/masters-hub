import { Link } from "react-router-dom";
import { closeModal } from "../store/slices/modalSlice";
import { useDispatch } from "react-redux";

const ServiceItem = ({ enService, step, setStep, recordingSlots, setChosenService }) => {
  console.log(enService);
  const dispatch = useDispatch()
  return (
    <div className="item rounded-lg bg-base-300 p-3">
      <div className="flex gap-6 items-center mb-2">
        <img
          src={`/backend/masterhub/${enService.photo}`}
          alt=""
          className="w-16 h-16 object-cover rounded-lg"
        />
        <h3 className="text-2xl">{enService.title}</h3>
      </div>

      <div className="mt-auto flex justify-between items-center">
        <div className="flex gap-1 flex-col mb-2">
          <div className="flex items-center gap-4">
            <span className=" text-slate-500 text-xl">
              {enService.price} RUB
            </span>

            <span className="text-slate-500">{enService.time}</span>
          </div>
          <Link to={`/profile/${enService.id}/specialist/${enService.specialist.id}`} onClick={() => dispatch(closeModal())} className="hover:underline">
            <span>Специалист: </span>
            <span>{enService.specialist.name}</span>  
            {" "}
            <span>{enService.specialist.job}</span>
          </Link>
        </div>

        <div className="flex justify-end">
          <button
            className="btn btn-primary text-base"
            onClick={() => {
              setStep(step + 1);
              recordingSlots(enService?.id, new Date());
              setChosenService(enService?.id)
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
