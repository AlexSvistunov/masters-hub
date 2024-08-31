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
            <div className="flex flex-col gap-4 mb-4 max-w-96">
              {specialists?.map((specialist) => (
                <div className="p-4 bg-base-200 rounded-xl" key={specialist.id}>
                  <div className="flex justify-between items-center">
                    <img className="object-cover rounded-lg"
                    width={100}
                    height={60}
                      src={`/backend/masterhub/static/${specialist.photo}`}
                      alt=""
                    />
                    <div>
                      <div>{specialist.name}</div>
                      <div>{specialist.job}</div>
                      <div>{specialist.description}</div>
                    </div>
                  </div>
                  {/* img */}
                </div>
              ))}
            </div>
            <button className="btn btn-accent">Добавить специалиста</button>
          </div>
        )}
      </BusinessLayout>
    </div>
  );

  // Добавить спеца И отображение спецов
  // loading
};

export default BusinessSpecialists;
