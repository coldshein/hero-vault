import { HeroInterface } from "./HeroType";

export interface resposeInterface {
  currentPage: number;
  heroes: HeroInterface[];
  totalHeroes: number;
  totalPages: number;
}
