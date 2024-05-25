
import { useDispatch } from "react-redux";
import { register } from "../store/slices/userSlice";
import Auth from "./Auth";


const Register = () => {
  const dispatch = useDispatch();

  const registerHandler = (username, password) => {
    dispatch(register({ username, password }));
  };

  return <Auth keyword="Зарегистрироваться" authHandler={registerHandler}/>;
};

export default Register;
