import { getHeroesByPublisher } from "../helpers";
import { HeroCard } from "./HeroCard";

type Publisher = "DC Comics" | "Marvel Comics";

export const HeroList = ({publisher}: {publisher: Publisher}) => {
  const heroesDc = getHeroesByPublisher(publisher);

  return (
    <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
      {heroesDc.map((hero) => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};
