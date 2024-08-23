import { useEffect, useState } from "react";
import URL from "../utils/backend-url";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import BusinessLayout from "../components/BusinessLayout";

const BusinessProfilePage = () => {
  const { token, currentToken } = useAuth();
  const [isError, setError] = useState('')

  console.log(isError)

  const [profileData, setProfileData] = useState({});
  console.log(profileData)

  const getProfile = async () => {
    const headers = {};
    if (token) {
      headers.Authorization = `Token ${currentToken}`;
    }
    try {
      const response = await fetch(`${URL}/api/admin-panel/profile/`, {
       headers
      });
      if(response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        throw new Error('no master profile')
      }
   

    } catch (error) {
      console.log('1231231232112')
      console.error("An error occurred:", error);
      setError(error.message)
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // не попадает в catch


  return (
    <div>
     <BusinessLayout>
      <>
      {isError && <button className="btn btn-accent">Создать профиль</button>}
      </>
     </BusinessLayout>

     
  
    </div>
  );

  //children
};

export default BusinessProfilePage;
