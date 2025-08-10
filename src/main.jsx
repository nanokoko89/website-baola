import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.scss";
import App from "./app/App";
import "./index.scss";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import LoadingScreen from "./components/utils/LoadingScreen";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<LoadingScreen />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
