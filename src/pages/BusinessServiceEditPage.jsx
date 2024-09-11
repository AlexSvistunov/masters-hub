import { useLocation, useParams } from "react-router-dom";
import BusinessLayout from "../components/business/BusinessLayout";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import URL from "../utils/backend-url";
import ErrorAlert from "../components/ui/ErrorAlert";
import SuccessAlert from "../components/ui/SuccessAlert";

const BusinessServiceEditPage = () => {
  const location = useLocation();
  const { state } = location;

  const { currentToken } = useAuth();

  const [alerts, setAlerts] = useState(false);
  const [alerte, setAlerte] = useState(false);
  const { id } = useParams();

  const item = state.find((service) => service.id === Number(id));

  const [inputValues, setInputValues] = useState(item);
  console.log(inputValues);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const patch = async (id) => {
    const updatedValues = getUpdatedValues();
    if (Object.keys(updatedValues).length > 0) {
      try {
        const response = await fetch(`${URL}/api/admin-panel/service/${id}/`, {
          method: "PATCH",
          body: JSON.stringify(updatedValues),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${currentToken}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setAlerts(true);
        return data;
      } catch (error) {
        setAlerte(error.message)
      }
    }
  };

  const getUpdatedValues = () => {
    const updatedValues = {};

    Object.keys(inputValues).forEach((key) => {
      if (inputValues[key] !== item[key]) {
        updatedValues[key] = inputValues[key];
      }
    });

    return updatedValues;
  };

  useEffect(() => {
    if(alerts) {
      setTimeout(() => {
        setAlerts((prev) => {
          if (prev === true) return false;
        });
  
  
      }, 4000);
    }
  }, [alerts])

  useEffect(() => {
    if(alerte) {
      setTimeout(() => {
        setAlerte((prev) => {
          if (prev === true) return false;
        });
  
  
      }, 4000);
    }
  }, [alerte])

  return (
    <BusinessLayout>
      <div className="flex justify-between tablet:items-center items-start mb-4 gap-4 tablet:flex-row flex-col">
        <h1 className="tablet:text-3xl text-2xl">Редактирование услуг</h1>
        <button className="btn btn-accent" onClick={() => patch(item.id)}>
          Сохранить изменения
        </button>
      </div>

      <div className="flex flex-col gap-4 max-w-sm">
        <input
          onChange={inputChange}
          className="input input-bordered"
          value={inputValues.title}
          placeholder="Заголовок"
          name="title"
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
          value={inputValues.price}
          placeholder="Цена"
          name="price"
        />
        <input
          onChange={inputChange}
          className="input input-bordered"
          value={inputValues.time}
          placeholder="Время"
          name="time"
        />
      </div>

      {/* <img
        src={`/backend/masterhub/${item.photo}`}
        alt=""
        className="w-16 h-16 object-cover rounded-lg"
      /> */}

      {alerts && <SuccessAlert text="Услуга успешно изменена!" />}

      {alerte && <ErrorAlert text={alerte} />}
      
    </BusinessLayout>
  );
};

// private route???
// loading

export default BusinessServiceEditPage;
