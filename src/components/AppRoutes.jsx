import { Route, Routes } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import Register from "./Register"
import Login from "./Login"

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  )
}

export default AppRoutes
