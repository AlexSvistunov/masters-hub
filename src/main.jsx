
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/main.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);



// Additional: 

// aside height
// выбрать услуги шаг не нужен
// fav loading if auth
// в целом организовать это loading, и тд
// categories slider
// popular condition + skeleton
// popular modal opens from minicatalog
// подумать что с мастером в записи
// закрытие модалок
// сменить на day picker
// search update data
// для меня mount/unmount когда открывается/закрывается
// chooseservice не unmount, потому что модалка не анмаунт
// поиск убавляется теги
// у специалиста запись
// loading favpage, recording page

// функционал
// фичи
// подробнее про каждый функционал
// menu
// если тыкую на функцонал который только с авторизацией - то перекидывает на register + do you aleady have an account?
// popular, minicatalog