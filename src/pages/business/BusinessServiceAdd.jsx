import { useForm } from "react-hook-form";
import BusinessLayout from "../../components/business/BusinessLayout";
import useAuth from "../../hooks/useAuth";
import URL from "../../utils/backend-url";
import { useEffect, useState } from "react";
import SuccessAlert from "../../components/ui/SuccessAlert";

const BusinessServiceAdd = () => {
  const { currentToken } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  const [categories, setCategories] = useState([])
  const [createSuccess, setCreateSuccess] = useState(false);

  const getCategories = async () => {
    try {
      const response = await fetch(`${URL}/api/admin-panel/categories/`, {
        headers: {
          Authorization: `Token ${currentToken}`,
        },

      });
      const data = await response.json()
      setCategories(data)
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  console.log(watch('category'))

  useEffect(() => {
    getCategories()
  }, [])

  const createService = async () => {
    const obj = {
      title: watch("title"),
      description: watch("description"),
      category: watch("category"),
      price: watch("price"),
      time: watch("time"),
    };

    try {
      const response = await fetch(`${URL}/api/admin-panel/service/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${currentToken}`,
        },

        body: JSON.stringify(obj),
      });

      if (!response.ok) {
        const data = await response.json();
        for (let key in data) {
          setError(key, { type: "custom", message: data[key][0]});
        }

        return
      }

      const data = await response.json();
      setCreateSuccess(true)
      reset()
      console.log(data);
      return data;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setCreateSuccess((prev) => {
        if (prev === true) return false;
      });


    }, 4000);
  }, [createSuccess]);

  return (
    <BusinessLayout>
      <h1 className="text-3xl mb-4">Создание услуги</h1>
      <form onSubmit={handleSubmit(createService)}>
        <div className="flex flex-col gap-2 max-w-80 mb-3">
          <input
            className="input input-bordered"
            placeholder="Заголовок"
            name="title"
            {...register("title", {
              required: "Поле обязательно к заполнению!",
            })}
          ></input>

          <span className="text-red-500">
            {errors.title && errors.title.message}
          </span>
          <input
            className="input input-bordered"
            placeholder="Описание"
            name="description"
            {...register("description")}
          ></input>
          <span className="text-red-500">
            {errors.description && errors.description.message}
          </span>

          <select {...register('category', {
            required: 'Выбор поля из списка обязателен!'
          })} className="select select-bordered w-full max-w-xs">
            <option disabled selected value=''>
              Категория
            </option>
            {categories.map(category => 
                <option key={category.id} value={category.id}>{category.title}</option>
            )}
          </select>
          <span className="text-red-500">
            {errors.category && errors.category.message}
          </span>
          <input
            className="input input-bordered"
            placeholder="Цена"
            name="price"
            {...register("price")}
          ></input>
          <span className="text-red-500">
            {errors.price && errors.price.message}
          </span>

          <input
            className="input input-bordered"
            placeholder="Время"
            name="time"
            {...register("time", {
              required: "Поле обязательно к заполнению!",
            })}
          ></input>
          <span className="text-red-500">
            {errors.time && errors.time.message}
          </span>
        </div>

        <button className="btn btn-accent my-2">Создать услугу</button>
      </form>

      
      {createSuccess && (
        <SuccessAlert text='Услуга успешно создана!'/>
      )}
    </BusinessLayout>
  );
};

export default BusinessServiceAdd;