import { useState } from "react";
import useAuth from "../hooks/useAuth";
import URL from "../utils/backend-url";
import { useForm } from "react-hook-form";

const CreateProfile = () => {
  const { currentToken } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [profileFields, setProfileFields] = useState({
    name: "",
    address: "",
    phone: "",
    specialization: "",
    link_vk: "",
    link_tg: "",
    description: "",
  });

  // const testObject = {
  //   name: "Alex",
  //   address: "Pushkina",
  //   phone: "79999999999",
  //   specialization: "master",
  //   link_vk: "vk.com",
  //   link_tg: "tgweb.com",
  //   description: "крутой тип",
  //   time_relax: "00:30:00"
  // };

  console.log(profileFields);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileFields({
      ...profileFields,
      [name]: value,
    });
  };

  const createProfile = async () => {
    const {
      name,
      address,
      phone,
      specialization,
      link_vk,
      link_tg,
      description,
    } = profileFields;

    const testObject = {
      name: watch('name'),
      address: watch('adress'),
      phone: watch('phone'),
      specialization: watch('specialization'),
      link_vk: watch('link_vk'),
      link_tg: watch('link_tg'),
      description: watch('description'),
      time_relax: "00:30:00",
    };

    console.log(testObject);

    try {
      const response = await fetch(`${URL}/api/admin-panel/profile/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  console.log(watch('name'))


  return (
    <div className="m-5">
      <h1 className="text-3xl mb-4">Создание профиля</h1>
      <form onSubmit={handleSubmit(createProfile)}>
        <div className="flex flex-col gap-2 max-w-80 mb-3">
          <input
            className="input input-bordered"
            placeholder="Имя"
            name="name"
            // value={profileFields.name}
            // onChange={handleChange}
            {...register('name', {required: true})}
          ></input>
          <input
            className="input input-bordered"
            placeholder="Адрес"
            name="address"
            value={profileFields.address}
            onChange={handleChange}
            {...register('address', {required: true})}
          ></input>
          <input
            className="input input-bordered"
            placeholder="Телефон"
            name="phone"
            value={profileFields.phone}
            onChange={handleChange}
            {...register('phone', {required: true})}
          ></input>
          <input
            className="input input-bordered"
            placeholder="Специализация"
            name="specialization"
            value={profileFields.specialization}
            onChange={handleChange}
            {...register('specialization', {required: true})}
          ></input>
          <input
            className="input input-bordered"
            placeholder="Ссылка на VK"
            name="link_vk"
            value={profileFields.link_vk}
            onChange={handleChange}
            {...register('link_vk', {required: true})}
          ></input>
          <input
            className="input input-bordered"
            placeholder="Ссылка на TG"
            name="link_tg"
            value={profileFields.link_tg}
            onChange={handleChange}
            {...register('link_tg', {required: true})}
          ></input>
          <input
            className="input input-bordered"
            placeholder="Описание"
            name="description"
            value={profileFields.description}
            onChange={handleChange}
            {...register('description', {required: true})}
          ></input>
        </div>

        <button className="btn btn-accent my-2">
          Создать профиль
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
