import { useState } from "react";
import useAuth from "../hooks/useAuth";
import URL from "../utils/backend-url";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MyDropzone from "../components/MyDropZone";



const CreateProfile = () => {
  const { currentToken } = useAuth();
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const createProfile = async () => {
    const testObject = {
      name: watch("name"),
      address: watch("address"),
      phone: watch("phone"),
      specialization: watch("specialization"),
      link_vk: watch("link_vk"),
      link_tg: watch("link_tg"),
      description: watch("description"),
      time_relax: "00:30:00",
    };

    try {
      const response = await fetch(`${URL}/api/admin-panel/profile/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${currentToken}`,
        },

        body: JSON.stringify(testObject),
      });

      if (!response.ok) {
        const data = await response.json();
        for (let key in data) {
          setError(key, { type: "custom", message: data[key][0]});
        }
      } else {
        navigate("/business/profile");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  return (
    <div className="m-5">
      <h1 className="text-3xl mb-4">Создание профиля</h1>
      <form onSubmit={handleSubmit(createProfile)}>
        <div className="flex flex-col gap-2 max-w-80 mb-3">
          <input
            className="input input-bordered"
            placeholder="Имя"
            name="name"
            {...register("name", {
              required: "Поле обязательно к заполнению!",
            })}
          ></input>

          <span className="text-red-500">
            {errors.name && errors.name.message}
          </span>
          <input
            className="input input-bordered"
            placeholder="Адрес"
            name="address"
            {...register("address", {
              required: "Поле обязательно к заполнению!",
            })}
          ></input>
          <span className="text-red-500">
            {errors.address && errors.address.message}
          </span>
          <input
            className="input input-bordered"
            placeholder="Телефон"
            name="phone"
            {...register("phone", {
              required: "Поле обязательно к заполнению!",
            })}
          ></input>
          <span className="text-red-500">
            {errors.phone && errors.phone.message}
          </span>
          <input
            className="input input-bordered"
            placeholder="Специализация"
            name="specialization"
            {...register("specialization", {
              required: "Поле обязательно к заполнению!",
              pattern: {
                value: /^(master|studio)$/,
                message:
                  'Специализация должна быть либо "master", либо "studio"',
              },
            })}
          ></input>
          <span className="text-red-500">
            {errors.specialization && errors.specialization.message}
          </span>
          <input
            className="input input-bordered"
            placeholder="Ссылка на VK"
            name="link_vk"
            {...register("link_vk", {
              required: "Поле обязательно к заполнению!",
            })}
          ></input>
          <span className="text-red-500">
            {errors.link_vk && errors.link_vk.message}
          </span>
          <input
            className="input input-bordered"
            placeholder="Ссылка на TG"
            name="link_tg"
            {...register("link_tg", {
              required: "Поле обязательно к заполнению!",
            })}
          ></input>
          <span className="text-red-500">
            {errors.link_tg && errors.link_tg.message}
          </span>
          <input
            className="input input-bordered"
            placeholder="Описание"
            name="description"
            {...register("description", {
              required: "Поле обязательно к заполнению!",
            })}
          ></input>
          <span className="text-red-500">
            {errors.description && errors.description.message}
          </span>
        </div>

        <button className="btn btn-accent my-2">Создать профиль</button>
      </form>

      {/* <MyDropzone/> */}
    </div>
  );
};

// input + span seperate component


export default CreateProfile;