import { Route, Routes } from "react-router-dom"

import LandingPage from "../pages/LandingPage"
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage"
import MasterPage from "../pages/MasterPage"
import CatalogPage from "../pages/CatalogPage"
import FavoritesPage from "../pages/FavoritesPage"
import SpecialistPage from "../pages/SpecialistPage"
import RecordingPage from "../pages/RecordingPage"
import AllReviews from "../pages/AllReviews"

import BusinessCreateProfilePage from "../pages/business/BusinessProfileCreatePage"
import BusinessProfilePage from "../pages/business/BusinessProfilePage"
import BusinessProfileEditPage from "../pages/business/BusinessProfileEditPage"
import BusinessMainPage from "../pages/business/BusinessPage"
import BusinessCategories from "../pages/business/BusinessCategories"
import BusinessSpecialists from "../pages/business/BusinessSpecialists"
import BusinessService from "../pages/business/BusinessService"
import BusinessSpecialistsAdd from '../pages/business/BusinessSpecialistsAdd'
import BusinessServiceAdd from "../pages/business/BusinessServiceAdd"
import BusinessServiceEditPage from "../pages/business/BusinessServiceEditPage"
import BusinessSpecialistPage from "../pages/business/BusinessSpecialistPage"
import BusinessWorkTime from "../pages/business/BusinessWorkTime"
import BusinessWorkTimeE from "../pages/business/BusinessWorkTimeE"
import BusinessSpecialistEdit from "../pages/business/BusinessSpecialistEdit"
import BusinessWorkTimeSpec from "../pages/business/BusinessWorkTimeSpec"
import BusinessRecordingPage from "../pages/business/BusinessRecordingPage"

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

      <Route path={RoutesConfig.BUSINESS} element={<BusinessMainPage />} />  
      <Route path={RoutesConfig.BUSINESS_PROFILE} element={<BusinessProfilePage />} />  
      <Route path={RoutesConfig.BUSINESS_PROJECTS} element={<BusinessProfilePage />} />  
      <Route path={RoutesConfig.BUSINESS_PROFILE_CREATION} element={<BusinessCreateProfilePage />} />  
      <Route path={RoutesConfig.BUSINESS_PROFILE_EDIT} element={<BusinessProfileEditPage />} />  
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
