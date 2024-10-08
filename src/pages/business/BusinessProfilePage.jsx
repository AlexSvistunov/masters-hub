import { useEffect, useRef, useState } from "react";
import URL from "../../utils/backend-url";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import BusinessLayout from "../../components/business/BusinessLayout";
import { MoonLoader } from "react-spinners";
import { useFetch } from "../../hooks/useFetch";


const BusinessProfilePage = () => {

  const { token, currentToken } = useAuth();

  const [profileData, setProfileData] = useState({});

  const getProfile = async () => {
    const headers = {};
    if (token) {
      headers.Authorization = `Token ${currentToken}`;
    }
    const response = await fetch(`${URL}/api/admin-panel/profile/`, {
      headers,
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Нет профиля! Создайте профиль");
      } else {
        throw new Error("Something went wrong");
      }
    }

    const data = await response.json();
    setProfileData(data);
  };

  const [getBusinessProfile, isLoading, error] = useFetch(getProfile);

  useEffect(() => {
    getBusinessProfile();
  }, []);

  return (
    <div>
      <BusinessLayout>
        <>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <MoonLoader color="#00cab6" size={75}></MoonLoader>
            </div>
          ) : error ? (
            <div className="flex flex-col gap-3 items-start">
              <span className="text-xl">{error}</span>
              <Link
                to={"/business/profile/creation"}
                className="btn btn-accent"
              >
                Создать профиль
              </Link>
            </div>
          ) : (
            profileData && (
              <div>
                <div className="flex justify-between mb-5">
                  <h1 className="text-3xl mb-4">Профиль</h1>
                  <Link className="btn btn-accent" to="/business/profile/edit" state={profileData}>
                    Редактировать
                  </Link>
                </div>

                

                <div className="flex gap-7">
                  <img
                    className="object-cover h-52 w-52 rounded-lg"
                    src={`/backend/masterhub/${profileData.photo}`}
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
                      <span className="text-gray-500">
                        {profileData.address}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl">Ссылки</h3>
                      <div className="flex gap-2">
                        {profileData.link_tg && (
                          <Link to={profileData.link_tg} target="_blank">
                            <img
                              className="w-8 h-8"
                              src="/tg-icon.svg"
                              alt="tg"
                            />
                          </Link>
                        )}

                        {profileData.link_vk && (
                          <Link to={profileData.link_vk} target="_blank">
                            <img
                              className="w-8 h-8"
                              src="/vk-icon.png"
                              alt="vk"
                            />
                          </Link>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl">О себе</h3>
                      <p className="text-gray-500">{profileData.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </>
      </BusinessLayout>
    </div>
  );
};



export default BusinessProfilePage;
