import ErrorAlert from "./ui/ErrorAlert";
import SuccessAlert from "./ui/SuccessAlert";

const AlertProvider = ({children}) => {
  return (
    <>
      <SuccessAlert seconds={2000} />
      <ErrorAlert seconds={2000} />
      {children}
    </>
  );
};

export default AlertProvider;
