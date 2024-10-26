import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { HeroesDetailsPage } from "./pages/HeroDetailsPage/HeroesDetailsPage";
import { HeroesPage } from "./pages/HeroesPage";

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>  
          <Route index element={<HeroesPage />} />
          <Route path=":id" element={<HeroesDetailsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
