import { CardList } from "../components/CardList";
import { Topbar } from "../components/Topbar";

export const HeroesPage = () => {

  return (
    <section className="w-full">
      <Topbar/>
      <CardList />
    </section>
  );
};
