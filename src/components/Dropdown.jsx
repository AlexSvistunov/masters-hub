import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../store/slices/userSlice";
import useAuth from "../hooks/useAuth";

const Dropdown = () => {
  const dispatch = useDispatch();
  const { currentToken } = useAuth();

  return (
    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
      <li>
        <Link to="/">Главная</Link>
      </li>
      <li>
        <Link  state='dropdown' to="/recording">Мои записи</Link>
      </li>

      <li>
        <Link state='dropdown' to="/favorites">Избранное</Link>
      </li>

      <li>
        <Link to="/business/profile">
          Мой профиль <span className="text-accent">business</span>
        </Link>
      </li>

      <li>
        <button onClick={() => dispatch(logOut({ currentToken }))}>
          Выйти
        </button>
      </li>
    </ul>
  );
};

export default Dropdown;
