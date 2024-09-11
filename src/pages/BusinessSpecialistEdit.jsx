import { useParams } from "react-router-dom"
import BusinessLayout from "../components/business/BusinessLayout"
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useFetch } from "../hooks/useFetch";
import URL from "../utils/backend-url";
import ErrorAlert from "../components/ui/ErrorAlert";
import SuccessAlert from "../components/ui/SuccessAlert";

const BusinessSpecialistEdit = () => {
  const {id} = useParams()
  const { currentToken } = useAuth();

  const [specialistData, setSpecialistData] = useState({});
  const [inputValues, setInputValues] = useState({});

  console.log(specialistData)
  console.log(inputValues)

  const [alertSuccess, setAlertSuccess] = useState(false)
  const [alertError, setAlertError] = useState(false)

  const getSpecialist = async () => {
    const response = await fetch(`${URL}/api/admin-panel/specialist/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${currentToken}`,
      },
    });
    if (!response.ok) throw new Error("Something went wrong!");
    const data = await response.json();
    setSpecialistData(data);
    setInputValues(data)
    console.log(data);

    return data;
  };

  const patch = async (id) => {
    const updatedValues = getUpdatedValues();
    if (Object.keys(updatedValues).length > 0) {
      try {
        const response = await fetch(`${URL}/api/admin-panel/specialist/${id}/`, {
          method: "PATCH",
          body: JSON.stringify(updatedValues),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${currentToken}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setAlertSuccess(true);
        return data;
      } catch (error) {
        setAlertError(error.message)
      }
    }
  }

  const inputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const getUpdatedValues = () => {
    const updatedValues = {};

    Object.keys(inputValues).forEach((key) => {
      if (inputValues[key] !== specialistData[key]) {
        updatedValues[key] = inputValues[key];
      }
    });

    return updatedValues;
  };

  const [getSpecialistData, isLoading, error] = useFetch(getSpecialist);

  useEffect(() => {
    getSpecialistData();
  }, []);

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
      <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Редактирование специалиста</h1>
        <button className="btn btn-accent" onClick={() => patch(specialistData.id)}>
          Сохранить изменения
        </button>
      </div>

      <div className="flex flex-col gap-4 max-w-sm">
        <input
          onChange={inputChange}
          className="input input-bordered"
          value={inputValues.name}
          placeholder="Заголовок"
          name="name"
        />
        <input
          onChange={inputChange}
          className="input input-bordered"
          value={inputValues.description}
          placeholder="Описание"
          name="description"
        />
        <input
          onChange={inputChange}
          className="input input-bordered"
          value={inputValues.job}
          placeholder="Специализация"
          name="job"
        />
      </div>

      {/* <img
        src={`/backend/masterhub/${item.photo}`}
        alt=""
        className="w-16 h-16 object-cover rounded-lg"
      /> */}

      {alertSuccess && <SuccessAlert text="Специалист успешно отредактирован!" />}

      {alertError && <ErrorAlert text={alertError} />}
      </div>
    </BusinessLayout>
  )
}

// loading
//back btn

export default BusinessSpecialistEdit