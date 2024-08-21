import { Route, Routes } from "react-router-dom"

import LandingPage from "../pages/LandingPage"
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage"
import MasterPage from "../pages/MasterPage"
import CatalogPage from "../pages/CatalogPage"
import FavoritesPage from "../pages/FavoritesPage"
import BusinessPage from "../pages/BusinessPage"
import BusinessProfilePage from "../pages/BusinessProfilePage"
import TestPage from "../pages/TestPage"
import SpecialistPage from "../pages/SpecialistPage"
import CreateProfile from "../pages/CreateProfile"
import RecordingPage from "../pages/RecordingPage"
import AllReviews from "../pages/AllReviews"


const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/profile/:id" element={<MasterPage/>}></Route>
        <Route path="/profile/:id/specialist/:specId" element={<SpecialistPage/>}></Route>
        <Route path="/catalog" element={<CatalogPage/>}></Route>
        <Route path="/favorites" element={<FavoritesPage/>}></Route>
        <Route path="/recording" element={<RecordingPage/>}></Route>
        <Route path="/business" element={<BusinessPage/>}></Route>
        <Route path="/business/profile" element={<BusinessProfilePage/>}></Route>
        <Route path="/business/projects" element={<BusinessProfilePage/>}></Route>
        <Route path="/business/profile/creation" element={<CreateProfile/>}></Route>
        <Route path="/test" element={<TestPage/>}></Route>
        <Route path="/all-reviews/:id" element={<AllReviews/>}></Route>
      </Routes>
    </div>
  )
}

export default AppRoutes
