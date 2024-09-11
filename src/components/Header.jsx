import { Link } from "react-router-dom";
// import useThemeChanger from "../hooks/useThemeChanger";
import { changeTheme } from "../store/slices/themeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { logOut } from "../store/slices/userSlice";
import Dropdown from "./Dropdown";
import ToggleTheme from "./ToggleTheme";

const Header = () => {
  const dispatch = useDispatch();
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const token = useSelector((state) => state.user.token);
  const image = useSelector((state) => state.user.image);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const visible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header
      className="navbar justify-between p-1 container mx-auto fixed top-0 left-0 right-0 bg-base-300 z-20 rounded-xl mt-8 sm: max-w-7xl w-11/12 gap-2 flex-col phone:flex-row phone:p-5"
      style={{ top: visible ? "0" : "-250px", transition: ".3s ease" }}
    >
      <Link
        to={"/"}
        className="font-bold text-xl tablet:text-3xl tracking-widest block flex items-center gap-1"
        href=""
      >
        MASTERS <span className="text-primary">HUB</span>
      </Link>

      <div className="flex items-center gap-4 phone:flex-row flex-col">
        <div className="flex gap-5">
          {!token ? (
            <>
              <div className="gap-3 flex flex-col tablet:flex-row">
                <Link to={"/login"} className="btn btn-primary">
                  Войти
                </Link>
                <Link to={"/register"} className="btn btn-primary">
                  Зарегистрироваться
                </Link>
              </div>
            </>
          ) : (
            <div className="">
              <details className="dropdown">
                <summary className="m-1 btn bg-base-300 border-base-300 shadow-none">
                  <div className="avatar bg">
                    <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={image} alt="" />
                    </div>
                  </div>
                </summary>
                <Dropdown />
              </details>
            </div>
          )}
        </div>

        <ToggleTheme />
      </div>
    </header>
  );
};

export default Header;
