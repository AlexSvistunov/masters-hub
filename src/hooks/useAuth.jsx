import { useSelector } from "react-redux";

const useAuth = () => {
  const isToken = useSelector((state) => state.user.token);


  return {
    
    token: !!isToken,
    currentToken: isToken
  };
};

export default useAuth;
