import { useEffect, useState } from "react";
import BusinessLayout from "../components/BusinessLayout";
import URL from "../utils/backend-url";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({});
  const { currentToken } = useAuth();
  const [isError, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState(profileData);
  console.log(inputValues);

  console.log(profileData);

  const getProfile = async () => {
    const headers = {};
    if (currentToken) {
      headers.Authorization = `Token ${currentToken}`;
    }
    try {
      const response = await fetch(`${URL}/api/admin-panel/profile/`, {
        headers,
      });

      if (!response.ok) throw new Error("no master profile");
      const data = await response.json();
      setProfileData(data);
      setInputValues(data);
    } catch (error) {
      setError(error.message);
      navigate("/business/profile");
    } finally {
      setIsLoading(false);
    }
  };

  const inputChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const patch = async (id) => {
    try {
      const response = await fetch(`${URL}/api/admin-panel/profile/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify(inputValues),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${currentToken}`
        }
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <BusinessLayout>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-xl">
          Имя
          <input
            className="input input-accent max-w-80"
            value={inputValues.name}
            onChange={inputChange}
            name="name"
          ></input>
        </label>

        <label className="flex flex-col gap-2 text-xl">
          Адрес
          <input
            className="input input-accent max-w-80"
            value={inputValues.address}
            onChange={inputChange}
            name="address"
          ></input>
        </label>

        <label className="flex flex-col gap-2 text-xl">
          Ссылка на TG
          <input
            className="input input-accent max-w-80"
            value={inputValues.link_tg}
            onChange={inputChange}
            name="link_tg"
          ></input>
        </label>

        <label className="flex flex-col gap-2 text-xl">
          Ссылка на VK
          <input
            className="input input-accent max-w-80"
            value={inputValues.link_vk}
            onChange={inputChange}
            name="link_vk"
          ></input>
        </label>

        <label className="flex flex-col gap-2 text-xl">
          Телефон
          <input
            className="input input-accent max-w-80"
            value={inputValues.phone}
            onChange={inputChange}
            name="phone"
          ></input>
        </label>

        <label className="flex flex-col gap-2 text-xl">
          Описание
          <textarea
            className="textarea textarea-accent max-w-80"
            value={inputValues.description}
            onChange={inputChange}
            name="description"
          ></textarea>
        </label>

        <button onClick={() => patch(profileData.id)} className="btn self-start btn-accent">Сохранить изменения</button>
      </div>
    </BusinessLayout>
  );
};

export default EditProfile;
