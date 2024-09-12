import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./components/AppRoutes";
import { useEffect } from "react";
import { startTheme } from "./store/slices/themeSlice";
import SuccessAlert from "./components/ui/SuccessAlert";
import ErrorAlert from "./components/ui/ErrorAlert";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startTheme());
  }, []);

  return (
    <>
      <AppRoutes />
      <SuccessAlert seconds={2000} />
      <ErrorAlert seconds={2000}/>
    </>
  );
}
