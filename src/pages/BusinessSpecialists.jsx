import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import URL from "../utils/backend-url";
import BusinessLayout from "../components/BusinessLayout";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";

const BusinessSpecialists = () => {
  const { currentToken } = useAuth();
  const [specialists, setSpecialists] = useState([]);

  const fetchSpecialists = async () => {
    const response = await fetch(`${URL}/api/admin-panel/specialist/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${currentToken}`,
      },
    });
    if (!response.ok) throw new Error("something went wrong");
    const data = await response.json();
    setSpecialists(data);
    return data;
  };

  const [getSpecialists, isLoading, error] = useFetch(fetchSpecialists);

  useEffect(() => {
    getSpecialists();
  }, []);
  console.log(specialists);
  return (
    <div>
      <BusinessLayout>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <MoonLoader color="#00cab6" size={75}></MoonLoader>
          </div>
        ) : error ? (
          <Link to="/business/profile/creation" className="btn btn-accent">
            Создать профиль
          </Link>
        ) : (

          <div>
            <div className="flex flex-col gap-4 mb-4 max-w-2xl">
              {specialists?.map((specialist) => (
                <div className="p-4 bg-base-200 rounded-xl" key={specialist.id}>
                  <div className="flex gap-8">
                    
                    <img className="object-cover bg-center h-40 w-40 rounded-lg"

                      src={`/backend/masterhub/static/${specialist.photo}`}
                      alt=""
                    />
                    <div className="max-w-xs">
                      <div className="text-2xl">{specialist.name}</div>
                      <div className="text-gray-400 mb-5">{specialist.job}</div>
                      <div className="text-gray-400">{specialist.description}</div>
                    </div>
                  </div>
                  {/* img */}
                </div>
              ))}
            </div>
            <Link to='/business/specialists/create' className="btn btn-accent">Добавить специалиста</Link>
          </div>
        )}
      </BusinessLayout>
    </div>
  );

  // Добавить спеца И отображение спецов
  // loading
};

export default BusinessSpecialists;
