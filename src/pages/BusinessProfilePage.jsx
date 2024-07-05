import { useEffect, useState } from "react";
import { URL } from "../utils/backend-url";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";


const BusinessProfilePage = () => {

  const {currentToken} = useAuth()

  const [profileData, setProfileData] = useState({})

  const getProfile = async () => {
    try {
      const response = await fetch(`${URL}/api/admin-panel/profile/`, {
        headers: {
          Authorization: `Token ${currentToken}`
        }
      });
      const data = await response.json();
      setProfileData(data)
      console.log(data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    getProfile()
  }, [])

  if(profileData?.detail === 'no profile') {
    return (
      <div>
        No profile!

        <Link to='/business/profile/creation'>
          Создать профиль
        </Link>
      </div>
    )
  }

  
  return (
    <div>
     
    </div>
  )
}

export default BusinessProfilePage