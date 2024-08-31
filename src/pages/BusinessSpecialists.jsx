import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import URL from "../utils/backend-url";
import BusinessLayout from "../components/BusinessLayout";

const BusinessSpecialists = () => {
    const {currentToken} = useAuth()
    const [specialists, setSpecialists] = useState([])
    const getSpecialists = async () => {
        try {
          const response = await fetch(`${URL}/api/admin-panel/specialist/`, {
            method: "GET",
            headers: {
              Authorization: `Token ${currentToken}`,
            },
          });
          const data = await response.json();
          console.log(data);
    
          setSpecialists(data);
          return data;
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };
      useEffect(() => {
        getSpecialists();
      }, []);

  return (
    <div>
        <BusinessLayout>
            <button className="btn btn-accent">Добавить специалиста</button>
        </BusinessLayout>
      
    </div>
  )
}

export default BusinessSpecialists
