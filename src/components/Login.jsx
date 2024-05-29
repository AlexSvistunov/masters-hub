
import { useDispatch } from "react-redux";
import { logIn } from "../store/slices/userSlice";
import Auth from "./Auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const loginHandler = async ({email, password}) => {
    console.log(email)
    console.log(password)
    await dispatch(logIn({ email, password })).then((data) => {
      if (data.payload.auth_token) {
        navigate('/');
      }
    });
  };

  return <Auth keyword="Войти" authHandler={loginHandler}/>;
};

export default Login;
