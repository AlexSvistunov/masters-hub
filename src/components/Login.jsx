
import { useDispatch } from "react-redux";
import { logIn } from "../store/slices/userSlice";
import Auth from "./Auth";

const Login = () => {
  const dispatch = useDispatch();

  const loginHandler = (username, password) => {
    dispatch(logIn({ username, password }));
  };

  return <Auth keyword="Войти" authHandler={loginHandler}/>;
};

export default Login;
