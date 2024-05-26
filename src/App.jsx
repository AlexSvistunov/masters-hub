import { useDispatch } from "react-redux";
import AppRoutes from "./components/AppRoutes";
import { useEffect } from "react";
import { startTheme } from "./store/slices/ThemeSlice";

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startTheme());
  }, []);
  return (
    <AppRoutes/>
  )
}