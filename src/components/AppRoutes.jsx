import { Route, Routes } from "react-router-dom"

import LandingPage from "../pages/LandingPage"
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage"
import MasterPage from "../pages/MasterPage"
import CatalogPage from "../pages/CatalogPage"
import FavoritesPage from "../pages/FavoritesPage"
import BusinessPage from "../pages/BusinessPage"
import BusinessProfilePage from "../pages/BusinessProfilePage"
import SpecialistPage from "../pages/SpecialistPage"
import CreateProfile from "../pages/BusinessProfileCreatePage"
import RecordingPage from "../pages/RecordingPage"
import AllReviews from "../pages/AllReviews"
import EditProfile from "../pages/BusinessProfileEditPage"
import BusinessCategories from "../pages/BusinessCategories"
import BusinessSpecialists from "../pages/BusinessSpecialists"
import BusinessService from "../pages/BusinessService"
import BusinessSpecialistsAdd from "../pages/BusinessSpecialistsAdd"
import BusinessServiceAdd from "../pages/BusinessServiceAdd"
import BusinessServiceEditPage from "../pages/BusinessServiceEditPage"
import BusinessSpecialistPage from "../pages/BusinessSpecialistPage"
import BusinessWorkTime from "../pages/BusinessWorkTime"
import BusinessWorkTimeE from "../pages/BusinessWorkTimeE"
import BusinessSpecialistEdit from "../pages/BusinessSpecialistEdit"
import BusinessWorkTimeSpec from "../pages/BusinessWorkTimeSpec"
import BusinessRecordingPage from "../pages/BusinessRecordingPage"

import { RoutesConfig } from "../utils/routes"


const AppRoutes = () => {
  return (  
    <Routes>  
      <Route path={RoutesConfig.LANDING} element={<LandingPage />} />  
      <Route path={RoutesConfig.REGISTER} element={<RegisterPage />} />  
      <Route path={RoutesConfig.LOGIN} element={<LoginPage />} />  
      <Route path={RoutesConfig.PROFILE(':id')} element={<MasterPage />} />  
      <Route path={RoutesConfig.SPECIALIST(':id', ':specId')} element={<SpecialistPage />} />  
      <Route path={RoutesConfig.CATALOG} element={<CatalogPage />} />  
      <Route path={RoutesConfig.FAVORITES} element={<FavoritesPage />} />  
      <Route path={RoutesConfig.RECORDING} element={<RecordingPage />} /> 

      <Route path={RoutesConfig.BUSINESS} element={<BusinessPage />} />  
      <Route path={RoutesConfig.BUSINESS_PROFILE} element={<BusinessProfilePage />} />  
      <Route path={RoutesConfig.BUSINESS_PROJECTS} element={<BusinessProfilePage />} />  
      <Route path={RoutesConfig.BUSINESS_PROFILE_CREATION} element={<CreateProfile />} />  
      <Route path={RoutesConfig.BUSINESS_PROFILE_EDIT} element={<EditProfile />} />  
      <Route path={RoutesConfig.BUSINESS_SPECIALISTS} element={<BusinessSpecialists />} />  
      <Route path={RoutesConfig.BUSINESS_SPECIALIST(':id')} element={<BusinessSpecialistPage />} />  
      <Route path={RoutesConfig.BUSINESS_SPECIALISTS_CREATE} element={<BusinessSpecialistsAdd />} />  
      <Route path={RoutesConfig.BUSINESS_SPECIALIST_EDIT(':id')} element={<BusinessSpecialistEdit />} />  
      <Route path={RoutesConfig.BUSINESS_CATEGORIES} element={<BusinessCategories />} />  
      <Route path={RoutesConfig.BUSINESS_SERVICE} element={<BusinessService />} />  
      <Route path={RoutesConfig.BUSINESS_SERVICE_CREATE} element={<BusinessServiceAdd />} />  
      <Route path={RoutesConfig.BUSINESS_SERVICE_EDIT(':id')} element={<BusinessServiceEditPage />} />  
      <Route path={RoutesConfig.BUSINESS_WORK_TIME} element={<BusinessWorkTime />} />  
      <Route path={RoutesConfig.BUSINESS_WORK_TIME_SPEC(':id')} element={<BusinessWorkTimeSpec />} />  
      <Route path={RoutesConfig.BUSINESS_WORK_TIME_EDIT} element={<BusinessWorkTimeE />} />  
      <Route path={RoutesConfig.BUSINESS_RECORDING} element={<BusinessRecordingPage />} />  
      
      <Route path={RoutesConfig.ALL_REVIEWS(':id')} element={<AllReviews />} />  
    </Routes>  
  );  
}

export default AppRoutes
