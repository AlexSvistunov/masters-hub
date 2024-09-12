import { useDispatch } from "react-redux";
import AppRoutes from "./components/AppRoutes";
import { useEffect } from "react";
import { startTheme } from "./store/slices/themeSlice";
import AlertProvider from "./components/AlertProvider";

export default function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startTheme());
  }, []);

  return (
    <AlertProvider>
      <AppRoutes />
    </AlertProvider>
  );
}
