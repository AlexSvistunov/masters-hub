import { Link } from "react-router-dom";
// import useThemeChanger from "../hooks/useThemeChanger";
import { changeTheme } from "../store/slices/ThemeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { logOut } from "../store/slices/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const stateTheme = useSelector((state) => state.theme.currentTheme);

  const handleThemeChange = () => {
    dispatch(changeTheme());
  };

  return (
    <div
      className="navbar justify-between p-5 container mx-auto fixed top-0 left-0 right-0 bg-base-300 z-20 rounded-xl mt-8"
      style={{ top: visible ? "0" : "-120px", transition: ".3s ease" }}
    >
      <Link
        to={"/"}
        className="font-bold text-3xl tracking-widest block flex items-center gap-1"
        href=""
      >
        MASTERS <span className="text-primary">HUB</span>
      </Link>

      <div className="flex items-center gap-8">
        <div className="flex gap-5">
          {!token ? (
            <>
              <Link to={"/login"} className="btn btn-primary">
                Войти
              </Link>
              <Link to={"/register"} className="btn btn-primary">
                Зарегистрироваться
              </Link>
            </>
          ) : (
            <div className="">
              
              <details className="dropdown">
                <summary className="m-1 btn bg-base-300 border-base-300 shadow-none">
                  <div className="avatar bg">
                    <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                </summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li>
                    <Link to='/'>Главная</Link>
                  </li>
                  <li>
                    <Link to='/notes'>Мои записи</Link>
                  </li>

                  <li>
                    <Link to='/favorites'>Избранное</Link>
                  </li>

                  <li>
                    <a>
                      Мои проекты <span className="text-accent">business</span>
                    </a>
                  </li>

                  <li>
                    <a>
                      Мой профиль <span className="text-accent">business</span>
                    </a>
                  </li>

                  <li>
                    <button onClick={() => dispatch(logOut({ token }))}>Выйти</button>
                  </li>
                </ul>
              </details>
            </div>
          )}
        </div>

        <label
          className=""
          onClick={handleThemeChange}
          style={{ cursor: "pointer" }}
        >
          {stateTheme === "light" ? (
            <svg
              className="fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
          ) : (
            <svg
              className="fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          )}
        </label>
      </div>
    </div>
  );
};

export default Header;