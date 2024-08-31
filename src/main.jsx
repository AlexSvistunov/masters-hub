
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


// menu
// если тыкую на функцонал который только с авторизацией - то перекидывает на register + do you aleady have an account?
// popular, minicatalog

// popular design
// fav loading
// continue decomposition

// studio info reviews
// categories slider
// recording post

// login register validation front + validation back
// alerts if success login/register
// recording page changes проверить с реальными записями + key for react
// при записи в личных данных можно сразу заполнить поля так как в настройках есть уже данные. но при этом поля ты должен заполнить, так как возможно ты записываешь подругу
// а если запись ошибка? -> alert либо что-то
// + попробовать почему бывает ошибка в записи, что-то там с time_end
// сделать запросы в бизнес красиво по хукам пока не поздно)