import { useDispatch } from "react-redux";
import { signUp } from "../store/slices/userSlice";
import Auth from "./Auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate("/");

  const registerHandler = async ({
    email,
    username,
    specialization,
    password,
  }) => {
    await dispatch(signUp({ email, username, specialization, password })).then(
      (data) => {
        console.log(data)
        if (data.payload.auth_token) {
          navigator("/");
        }
      }
    );
  };

  return <Auth keyword="Зарегистрироваться" authHandler={registerHandler} />;
};

export default Register;
