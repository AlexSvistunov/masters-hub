import { useState } from "react";
import useAuth from "../hooks/useAuth";
import URL from "../utils/backend-url";

const CreateProfile = () => {
  const { currentToken } = useAuth();

  const [profileFields, setProfileFields] = useState({
    name: "",
    address: "",
    phone: "",
    specialization: "",
    link_vk: "",
    link_tg: "",
    description: "",
  });

  console.log(profileFields);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileFields({
      ...profileFields,
      [name]: value,
    });
  };

  const createProfile = async () => {
    const testObject = {
      name: "Alex",
      address: "Pushkina",
      phone: "79999999999",
      specialization: "master",
      link_vk: "vk.com",
      link_tg: "tgweb.com",
      description: "крутой тип",
      time_relax: "00:30:00"
    };


    try {
      const response = await fetch(`${URL}/admin-panel/profile/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${currentToken}`,
        },

        body: JSON.stringify(testObject),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="m-5">
      <h1 className="text-3xl mb-4">Создание профиля</h1>
      <div className="flex flex-col gap-2 max-w-80">
        <input
          className="input input-bordered input-accent"
          placeholder="Имя"
          name="name"
          value={profileFields.name}
          onChange={handleChange}
        ></input>
        <input
          className="input input-bordered input-accent"
          placeholder="Адрес"
          name="address"
          value={profileFields.address}
          onChange={handleChange}
        ></input>
        <input
          className="input input-bordered input-accent"
          placeholder="Телефон"
          name="phone"
          value={profileFields.phone}
          onChange={handleChange}
        ></input>
        <input
          className="input input-bordered input-accent"
          placeholder="Специализация"
          name="specialization"
          value={profileFields.specialization}
          onChange={handleChange}
        ></input>
        <input
          className="input input-bordered input-accent"
          placeholder="Ссылка на VK"
          name="link_vk"
          value={profileFields.link_vk}
          onChange={handleChange}
        ></input>
        <input
          className="input input-bordered input-accent"
          placeholder="Ссылка на TG"
          name="link_tg"
          value={profileFields.link_tg}
          onChange={handleChange}
        ></input>
        <input
          className="input input-bordered input-accent"
          placeholder="Описание"
          name="description"
          value={profileFields.description}
          onChange={handleChange}
        ></input>
      </div>

      <button className="btn btn-accent my-2" onClick={createProfile}>
        Создать профиль
      </button>
    </div>
  );
};

export default CreateProfile;
