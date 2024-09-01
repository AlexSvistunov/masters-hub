import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import URL from "../utils/backend-url";
import BusinessLayout from "../components/BusinessLayout";
import { Link } from "react-router-dom";

const BusinessService = () => {
  const { currentToken } = useAuth();
  const [services, setServices] = useState([]);
  const getServices = async () => {
    try {
      const response = await fetch(`${URL}/api/admin-panel/service/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${currentToken}`,
        },
      });
      const data = await response.json();
      console.log(data);

      setServices(data);
      return data;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    getServices();
  }, []);
  return (
    <BusinessLayout>
      <button className="btn btn-accent mb-4">Добавить услугу</button>
      <div className="flex flex-col gap-4">
        {services?.map((enService) => (
          <div className="item rounded-lg bg-base-200 p-3" key={enService.id}>
            <div className="flex gap-6 items-center mb-2">
              <img
                src={`/backend/masterhub/${enService.photo}`}
                alt=""
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex flex-col gap-1 mb-2">
              <h3 className="text-2xl">{enService.title}</h3>
              <p className="text-gray-400">{enService.description}</p>
              </div>
            </div>

            <div className="mt-auto flex justify-between items-center">
              <div className="flex gap-1 flex-col mb-2">
                <div className="flex items-center gap-4">
                  <span className=" text-slate-500 text-xl">
                    {enService.price} RUB
                  </span>

                  <span className="text-slate-500">{enService.time}</span>
                </div>
                <Link
                  // onClick={() => dispatch(closeModal())}
                  className="hover:underline"
                >
   
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </BusinessLayout>
  );
};

// if photo null -> default photo

export default BusinessService;
