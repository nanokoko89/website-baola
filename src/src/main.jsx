import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss"; /* Nếu bạn có styles global (reset, font, ...) */
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import LoadingScreen from "./components/utils/LoadingScreen";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={<LoadingScreen />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
