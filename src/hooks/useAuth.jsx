import { useSelector } from "react-redux";

const useAuth = () => {
  const isToken = useSelector((state) => state.user.token);

  return {
    token: !!isToken,
  };
};

export default useAuth;
