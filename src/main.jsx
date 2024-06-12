
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
// profile just big card, I can use the component
// id modal redux


// Additional: 

// leave a review
// photo library
// breadcrumbs

