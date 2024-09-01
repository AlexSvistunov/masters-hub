import { useForm } from "react-hook-form";
import BusinessLayout from "../components/BusinessLayout";
import useAuth from "../hooks/useAuth";
import URL from "../utils/backend-url";
import { useEffect, useState } from "react";
import SuccessAlert from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";

const BusinessSpecialistsAdd = () => {
  const { currentToken } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const [alertSuccess, setAlertSuccess] = useState(false)
  const [alertError, setAlertError] = useState(false)

  const createSpec = async () => {
    const object = {
      name: watch("name"),
      job: watch("job"),
      description: watch("descr"),
    };

    try {
      const response = await fetch(`${URL}/api/admin-panel/specialist/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${currentToken}`,
        },

        body: JSON.stringify(object),
      });

      if(!response.ok) throw new Error('Failed to fetch')

      const data = await response.json();
      setAlertSuccess(true)
      return data
      
    } catch (error) {
      setAlertError(error.message)
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if(alertSuccess) {
      setTimeout(() => {
        setAlertSuccess((prev) => {
          if (prev === true) return false;
        });
  
  
      }, 4000);
    }
  }, [alertSuccess])

  useEffect(() => {
    if(alertError) {
      setTimeout(() => {
        setAlertError((prev) => {
          if (prev === true) return false;
        });
  
  
      }, 4000);
    }
  }, [alertError])



  return (
    <BusinessLayout>
      <h1 className="text-3xl mb-4">Создание специалиста</h1>
      <form
        className="flex flex-col max-w-xl gap-4"
        onSubmit={handleSubmit(createSpec)}
      >
        <div className="flex flex-col">
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
        </div>

        <div className="flex flex-col">
          <input
            className="input input-bordered"
            placeholder="Квалификация"
            name="job"
            {...register("job", {
              required: "Поле обязательно к заполнению!",
            })}
          ></input>

          <span className="text-red-500">
            {errors.job && errors.job.message}
          </span>
        </div>

        <div className="flex flex-col">
          <input
            className="input input-bordered"
            placeholder="Описание"
            name="descr"
            {...register("descr", {
              required: "Поле обязательно к заполнению!",
            })}
          ></input>
          <span className="text-red-500">{errors.descr && errors.descr.message}</span>
        </div>

        <button className="btn btn-accent">Создать специалиста</button>
      </form>

      {alertSuccess && (
        <SuccessAlert text='Специалист успешно создан!'/>
      )}

      {alertError && (
        <ErrorAlert text={alertError}/>
      )}
    </BusinessLayout>
  );
};

// hook for alert with 2 states

export default BusinessSpecialistsAdd;
