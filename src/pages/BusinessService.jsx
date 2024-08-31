import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import URL from "../utils/backend-url";
import BusinessLayout from "../components/BusinessLayout";


const BusinessService = () => {
    const {currentToken} = useAuth()
    const [services, setServices] = useState([])
    const getServices = async () => {
        try {
          const response = await fetch(`${URL}/api/admin-panel/service/`, {
            method: "GET",
            headers: {
              Authorization: `Token ${currentToken}`,
            },
          });
          const data = await response.json();
          console.log(data);
    
          setServices(data);
          return data;
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };
      useEffect(() => {
        getServices();
      }, []);
  return (
    <BusinessLayout>
      <button className="btn btn-accent">Добавить услугу</button>
    </BusinessLayout>
  )
}

export default BusinessService
