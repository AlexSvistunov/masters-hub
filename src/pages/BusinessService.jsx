import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import URL from "../utils/backend-url";
import BusinessLayout from "../components/business/BusinessLayout";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import { MoonLoader } from "react-spinners";

const BusinessService = () => {
  const { currentToken } = useAuth();
  const [services, setServices] = useState([]);
  console.log(services);

  const getServices = async () => {
    const response = await fetch(`${URL}/api/admin-panel/service/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${currentToken}`,
      },
    });
    if (!response.ok) throw new Error("Something went wrong!");
    const data = await response.json();
    setServices(data);
    return data;
  };

  const [getServiceData, isLoading, error] = useFetch(getServices);

  useEffect(() => {
    getServiceData();
  }, []);
  return (
    <BusinessLayout>
      <h1 className="text-3xl mb-4">Услуги</h1>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <MoonLoader color="#00cab6" size={75}></MoonLoader>
        </div>
      ) : error ? (
        <div className="flex flex-col gap-3 items-start">
          <div className="text-xl">{error}</div>
          <Link to="/business/profile/creation" className="btn btn-accent">
            Создать профиль
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-4">
            {services?.map((enService) => (
              <div
                className="item rounded-lg bg-base-200 p-3 relative"
                key={enService.id}
              >
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
                    ></Link>

                    <Link
                      to={`/business/service/${enService.id}/edit`}
                      state={services}
                    >
                      <Pencil
                        color={"#00CDB7"}
                        className="absolute top-4 right-4"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link to="/business/service/create" className="btn btn-accent mb-4">
            Добавить услугу
          </Link>
        </>
      )}
    </BusinessLayout>
  );
};

// if photo null -> default photo

export default BusinessService;
