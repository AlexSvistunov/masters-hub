import { Link, useParams } from "react-router-dom";
import BusinessLayout from "../components/business/BusinessLayout";
import { useFetch } from "../hooks/useFetch";
import URL from "../utils/backend-url";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Services from "../components/Services";

const BusinessSpecialistPage = () => {
  const { id } = useParams();
  const { currentToken } = useAuth();

  const [specialistData, setSpecialistData] = useState({});

  const getSpecialist = async () => {
    const response = await fetch(`${URL}/api/admin-panel/specialist/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${currentToken}`,
      },
    });
    if (!response.ok) throw new Error("Something went wrong!");
    const data = await response.json();
    setSpecialistData(data);
    console.log(data);

    return data;
  };

  const [getSpecialistData, isLoading, error] = useFetch(getSpecialist);

  

  useEffect(() => {
    getSpecialistData();
  }, []);

  return (
    <BusinessLayout>
      <div className="flex gap-10">
        
        <div className="flex-auto">
          <div className="flex gap-8 mb-5">
            <img
              src={`/backend/masterhub/static${specialistData?.photo}`}
              width={340}
              height={340}
              className="rounded-lg"
            ></img>

            <div className="bg-base-200 p-8 rounded-2xl flex-auto">
              <div className="mb-4">
                <h3 className="text-3xl">{specialistData?.name}</h3>
                <span className="text-gray-500 text-xl">
                  {specialistData?.job}
                </span>
              </div>
              <p className="text-lg">{specialistData?.description}</p>
            </div>
          </div>
          <Services masterData={specialistData} keyword="business" />
        </div>

        <Link className="btn btn-accent" to={`/business/specialists/${id}/edit`}>Редактировать</Link>
      </div>
    </BusinessLayout>
  );
};

export default BusinessSpecialistPage;
