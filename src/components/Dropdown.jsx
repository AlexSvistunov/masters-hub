import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../store/slices/userSlice";
import useAuth from "../hooks/useAuth";

const Dropdown = () => {
  const dispatch = useDispatch()
  const {currentToken} = useAuth()

  return (
    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
      <li>
        <Link to="/">Главная</Link>
      </li>
      <li>
        <Link to="/notes">Мои записи</Link>
      </li>

      <li>
        <Link to="/favorites">Избранное</Link>
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
        <button onClick={() => dispatch(logOut({ currentToken }))}>Выйти</button>
      </li>
    </ul>
  );
};

export default Dropdown;
