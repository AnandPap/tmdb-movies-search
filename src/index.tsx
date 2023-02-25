import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./redux/store";
import { Provider } from "react-redux/es/exports";
import MainRouter from "./router/MainRouter";
import "./styles/index.css";
import "./styles/reusable.css";
import "./styles/search-form.css";
import "./styles/home-page.css";
import "./styles/details-page.css";
import "./styles/nav-bar.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainRouter />
    </Provider>
  </React.StrictMode>
);
