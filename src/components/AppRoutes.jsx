import { Route, Routes } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage"
import MasterPage from "../pages/MasterPage"

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/profile" element={<MasterPage/>}></Route>
      </Routes>
    </div>
  )
}

export default AppRoutes
