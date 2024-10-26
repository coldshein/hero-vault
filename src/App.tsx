import "./App.css";
import { Header } from "./components/Header";
import { Container } from "./components/Container";
import { Outlet } from "react-router-dom";
import { CreateHero } from "./components/CreateHero";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <CreateHero />
    </>
  );
}

export default App;
