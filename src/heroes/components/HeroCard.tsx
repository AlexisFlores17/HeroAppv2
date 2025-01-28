import { Link } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Card } from "flowbite-react";
import { useRef, useState } from "react";
import { useCardAnimation3D } from "../hooks/useCardAnimation3D";

interface Props {
  id: string;
  superhero: string;
  publisher: string;
  alter_ego: string;
  first_appearance: string;
  characters: string;
}

gsap.registerPlugin(useGSAP);

export const HeroCard = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters,
}: Props) => {
  const heroImageUrl = `/assets/${id}.jpg`;
  const card = useRef<HTMLDivElement>(null);
  const [itsFlipped, setItsFlipped] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const glossRef = useRef<HTMLDivElement>(null);
  

  const {setIsHovered }= useCardAnimation3D({cardRef,glossRef, itsFlipped});

  const { contextSafe } = useGSAP({ scope: card });

  const onClickFlip = contextSafe(() => {
    gsap.to(card.current, { rotationY: "+=180", duration: 0.5 });
    setItsFlipped((prev) => !prev);
  });

  return (
    <>
      <div className="card" onClick={onClickFlip} ref={card}>
        <div
          className=" w-full h-full "
          ref={cardRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          <div  className="card-front  w-full h-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden cursor-pointer">
            <Card
             
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc={heroImageUrl}
            />
            <div
              className="gloss-card"
              ref={glossRef}
            />
          </div>
          <Card className="card-back  w-full h-full  bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden cursor-pointer">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              {superhero}
            </h5>
            <div className="font-normal text-gray-700 dark:text-gray-300 overflow-y-auto h-64">
              <p className="mb-2">
                <span className="font-semibold">Alter ego:</span> {alter_ego}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Primera aparición:</span>{" "}
                {first_appearance}
              </p>
              {alter_ego !== characters && (
                <p className="mb-2">
                  <span>Personajes:</span>
                  <span className="font-semibold"> {characters} </span>
                </p>
              )}
              <p className="mb-2">
                <span className="font-semibold">ID:</span> {id}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Publisher:</span> {publisher}
              </p>
            </div>
            <Link
              to={`/hero/${id}`}
              className="hover:text-slate-400 hover:underline"
            >
              Mas información
            </Link>
          </Card>
        </div>
      </div>
    </>
  );
};
