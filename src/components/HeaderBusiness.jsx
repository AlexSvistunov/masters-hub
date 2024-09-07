import { Link, useNavigate } from "react-router-dom";

import { logOut } from "../store/slices/userSlice";
import { useSelector } from "react-redux";
import Burger from "./Burger";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const HeaderBusiness = () => {
  const image = useSelector((state) => state.user.image);

  const { token } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if(!token) {
      navigate('/login')
    }
  }, [token])


  return (
    <header className="p-5">
      <div className="flex default-tablet:block">
        <Burger />

        <div className="flex items-center justify-between w-full">
          <Link
            to={"/business"}
            className="font-bold text-xl tracking-widest flex items-center gap-1"
            href=""
          >
            MASTERS<span className="text-accent">BUSINESS</span>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default HeaderBusiness;
