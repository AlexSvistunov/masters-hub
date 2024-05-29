
import { useDispatch } from "react-redux";
import { signUp } from "../store/slices/userSlice";
import Auth from "./Auth";


const Register = () => {
  const dispatch = useDispatch();

  const registerHandler = ({email, username, specialization, password}) => {
    dispatch(signUp({ email, username,specialization, password }));
  };

  return <Auth keyword="Зарегистрироваться" authHandler={registerHandler}/>;
};

export default Register;
