import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import URL from "../../utils/backend-url";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CategoryService from "../../service/CategoryService";
import { useFetch } from "../../hooks/useFetch";
import CustomSelect from "../../components/ui/CustomSelect";
import FormInput from "../../components/ui/FormInput";

import { formNames } from "../../utils/formNames";

const CreateProfile = () => {
  const { currentToken } = useAuth();
  const navigate = useNavigate();
  const [selectedValues, setSelectedValues] = useState([]);

  const [
    categoriesFetch,
    categoriesLoading,
    categoriesError,
    categoriesData,
    categoriesSetData,
  ] = useFetch(async () => {
    const data = await CategoryService.getAllCategories();
    return data;
  });

  useEffect(() => {
    categoriesFetch();
  }, []);

  const onChangeSelect = (e) => {
    setSelectedValues((prev) => {
      if (prev.includes(e.target.value)) {
        return [...prev];
      } else {
        return [...prev, e.target.value];
      }
    });
  };

  console.log(selectedValues);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const [avatar, setAvatar] = useState(null);

  const handleFileChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const createProfile = async () => {
    const testObject = {
      name: watch("name"),
      address: watch("address"),
      phone: watch("phone"),
      specialization: watch("specialization"),
      link_vk: watch("link_vk"),
      link_tg: watch("link_tg"),
      description: watch("description"),
      time_relax: watch("time_relax") ? watch("time_relax") : "00:30:00",
      // categories: categoriesData
      // photo: avatar
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

      if (!response.ok) {
        const data = await response.json();
        for (let key in data) {
          setError(key, { type: "custom", message: data[key][0] });
        }
      } else {
        navigate("/business/profile");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  console.log(categoriesData);

  return (
    <div className="m-5">
      <h1 className="text-3xl mb-4">Создание профиля</h1>
      <form onSubmit={handleSubmit(createProfile)}>
        <div className="flex flex-col gap-2 max-w-80 mb-3">
          {formNames.map(({ name, placeholder }) => (
            <FormInput
              key={name}
              errors={errors}
              name={name}
              register={register}
              placeholder={placeholder}
            />
          ))}

          <input
            className="input input-bordered"
            placeholder="Время отдыха между клиентами"
            name="time_relax"
            {...register("time_relax", {
              pattern: {
                value: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
                message: "Неверный формат времени. Используйте HH:MM:SS.",
              },
            })}
          ></input>

          <span className="text-red-500">
            {errors.time_relax && errors.time_relax.message}
          </span>

          <select
            className="select select-bordered w-full"
            onChange={onChangeSelect}
          >
            <option disabled selected>
              Ваши категории
            </option>
            {categoriesData?.map((category) => (
              <option value={category.id}>{category.title}</option>
            ))}
            <option value="" key=""></option>
          </select>

          {selectedValues.length ? (
            <div className="flex items-center gap-2 flex-wrap my-2">
              {categoriesData
                .filter((el) => selectedValues.includes(String(el.id)))
                .map((value) => (
                  <div
                    className="border border-accent rounded-md px-2"
                    key={value}
                  >
                    {value.title}
                  </div>
                ))}
            </div>
          ) : null}

          {/* <CustomSelect/> */}
        </div>

        <div className="flex flex-col gap-2 items-start mb-4">
          Аватар
          <input type="file" onChange={handleFileChange} accept="image/*" />
          {/* <button type="submit">Загрузить</button> */}
        </div>

        <button className="btn btn-accent my-2">Создать профиль</button>
      </form>

      {/* <MyDropzone/> */}
    </div>
  );
};

// input + span seperate component
// search select values
// delete select values
// content inside select

export default CreateProfile;
