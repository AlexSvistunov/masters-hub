import { Route, Routes } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage"
import MasterPage from "../pages/MasterPage"
import CatalogPage from "../pages/CatalogPage"
import FavoritesPage from "../pages/FavoritesPage"
import NotesPage from "../pages/NotesPage"
import BusinessPage from "../pages/BusinessPage"
import BusinessProfilePage from "../pages/BusinessProfilePage"


const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/profile" element={<MasterPage/>}></Route>
        <Route path="/catalog" element={<CatalogPage/>}></Route>
        <Route path="/favorites" element={<FavoritesPage/>}></Route>
        <Route path="/notes" element={<NotesPage/>}></Route>
        <Route path="/business" element={<BusinessPage/>}></Route>
        <Route path="/business/profile" element={<BusinessProfilePage/>}></Route>
      </Routes>
    </div>
  )
}

export default AppRoutes
