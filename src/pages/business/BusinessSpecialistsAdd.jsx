import { useForm } from "react-hook-form";
import BusinessLayout from "../../components/business/BusinessLayout";
import useAuth from "../../hooks/useAuth";
import URL from "../../utils/backend-url";
import { useEffect, useState } from "react";
import SuccessAlert from "../../components/ui/SuccessAlert";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { useDispatch } from 'react-redux'
import { showAlert } from '../../store/slices/successAlert'
import { showAlertError } from '../../store/slices/errorAlert'

const BusinessSpecialistsAdd = () => {
  const { currentToken } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  // const [alertSuccess, setAlertSuccess] = useState(false)
  // const [alertError, setAlertError] = useState(false)

  const dispatch = useDispatch()

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
      dispatch(showAlert({text: 'Специалист успешно создан!'}))
      reset()
      return data
      
    } catch (error) {
      console.error("An error occurred:", error);
      dispatch(showAlertError({text: 'Произошла ошибка!'}))
    }
  };


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

        <button className="btn btn-accent self-start">Создать специалиста</button>
      </form>

    </BusinessLayout>
  );
};

// hook for alert with 2 states

export default BusinessSpecialistsAdd;
