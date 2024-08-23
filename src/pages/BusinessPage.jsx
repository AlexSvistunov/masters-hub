import { Link, Route, Routes, useNavigate } from "react-router-dom";

import BusinessLayout from '../components/BusinessLayout.jsx'
import { useEffect } from "react";


const BusinessPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/business/profile/')
  }, [])
  return (
    <div>
       <BusinessLayout></BusinessLayout>
    </div>
  );
};

export default BusinessPage;
