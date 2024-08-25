import { useEffect, useState } from "react";
import URL from "../utils/backend-url";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import BusinessLayout from "../components/BusinessLayout";

const BusinessProfilePage = () => {
  const { token, currentToken } = useAuth();
  const [isError, setError] = useState("");

  const [profileData, setProfileData] = useState({});
  console.log(profileData);

  const getProfile = async () => {
    const headers = {};
    if (token) {
      headers.Authorization = `Token ${currentToken}`;
    }
    try {
      const response = await fetch(`${URL}/api/admin-panel/profile/`, {
        headers,
      });

      if(!response.ok)  throw new Error("no master profile");
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.log("1231231232112");
      console.error("An error occurred:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // не попадает в catch

  return (
    <div>
      <BusinessLayout>
        <>
          {isError && (
            <Link to={"/business/profile/creation"} className="btn btn-accent">
              Создать профиль
            </Link>
          )}

          {profileData && (
            <div>
              <div className="flex justify-between">
                <h1 className="text-2xl mb-4">Профиль</h1>
                <Link className="btn btn-accent">Редактировать</Link>
              </div>

              <div className="flex gap-7">
                <img
                  className="object-cover h-52 w-52 rounded-lg"
                  src={`/backend/masterhub/static/${profileData.photo}`}
                  alt="avatar"
                />

                <div className="flex flex-col gap-5">
                  <div className="block">
                    <h3 className="text-2xl">{profileData.name}</h3>
                    <span className="text-gray-500">
                      {profileData.specialization}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl">Телефон</h3>
                    <span className="text-gray-500">{profileData.phone}</span>
                  </div>

                  <div>
                    <h3 className="text-xl">Адрес мастера</h3>
                    <span className="text-gray-500">{profileData.address}</span>
                  </div>

                  <div>
                    <h3 className="text-xl">Ссылки</h3>
                    <div className="flex gap-2">
                      <Link>
                        <img className="w-8 h-8" src="/tg-icon.svg" alt="tg" />
                      </Link>

                      <Link>
                        <img className="w-8 h-8" src="/vk-icon.png" alt="vk" />
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl">О себе</h3>
                    <p className="text-gray-500">{profileData.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      </BusinessLayout>
    </div>
  );

 
  // links href
  // links condition
};

export default BusinessProfilePage;
