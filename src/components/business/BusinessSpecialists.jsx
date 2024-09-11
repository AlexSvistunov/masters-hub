import { Link } from "react-router-dom";

const BusinessSpecialists = ({ specialist, keyword }) => {
  return (
    <Link to={`/business/specialists/${specialist.id}`} key={specialist.id}>
      <div className="p-4 bg-base-200 rounded-xl flex">
        
        <div className="flex w-full tablet:flex-row flex-col gap-4">
          <div className="flex gap-8 flex-auto">
            <img
              className="object-cover bg-center tablet:h-40 tablet:w-40 w-24 h-24 rounded-lg"
              src={`/backend/masterhub/static/${specialist.photo}`}
              alt=""
            />
            <div className="max-w-xs">
              <div className="text-2xl">{specialist.name}</div>
              <div className="text-gray-400 mb-5">{specialist.job}</div>
              <div className="text-gray-400">{specialist.description}</div>
            </div>
          </div>

          <Link
            className="btn btn-accent self-end"
            to={`/business/work-time/${specialist.id}`}
          >
            Посмотреть график
          </Link>
        </div>
        {/* img */}
      </div>
    </Link>
  );
};

export default BusinessSpecialists;
