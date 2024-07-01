
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


// отзывы заменить цвет
// think of redux and hooks to not repeat the logic

// Additional: 

// leave a review
// photo library
// breadcrumbs

// just state 
// catalogcard .?

// склонения
// посмотреть все
// adaptive cards

// в какой-то из пагинаций делаю лишний запрос
// в записи в выборе услуг баг + нужна надпись ничего не найдено
// посмотреть реализацию календаря, подумать над админкой, календарем, записями

