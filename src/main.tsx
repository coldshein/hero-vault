import { createRoot } from "react-dom/client";
import "./index.css";
import { Root } from "./Root.tsx";
import { Provider } from "react-redux";
import { store } from "./lib/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Root />
  </Provider>
);
