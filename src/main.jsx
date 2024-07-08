
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
// посмотреть реализацию календаря, подfумать над админкой,z календарем, записями
// если записываться первый раз, то isLoading все норм, но потом 
// чето хромает, в том числе не просто loader, а зпрос может уйти  
// не туда (запрос вроде туда уходит, а вот отображение не 
// сбрасывается)
// выбранные категории
// модалки закрываются 

// no show more if there's no more items
// time doesn't change, error

// дописать сначала плохой код
// посмотреть как хорошо бы делать
// подумать посидеть =)
// изменять код, править