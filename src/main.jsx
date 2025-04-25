import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import RootContext from "./Context/RootContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <RootContext>
        <App />
      </RootContext>
    </I18nextProvider>
  </BrowserRouter>
);