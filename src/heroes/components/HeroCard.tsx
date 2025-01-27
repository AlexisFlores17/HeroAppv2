import { Link } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Card } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "../hooks/useMousePosition";

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
  const [isHovered, setIsHovered] = useState(false);
  const mousePosition = useMousePosition();
  const rx = useRef(0);
  const ry = useRef(0);
  const deg = useRef(0);
  const distanceToCenter = useRef(0);
  const maxDistance = useRef(0);

  useEffect(() => {
    const Rect = cardRef.current
      ? cardRef.current.getBoundingClientRect()
      : null;

    const halfWidth = Rect ? Rect.width / 2 : 0;
    const halfHeight = Rect ? Rect.height / 2 : 0;

    const cardCenterX = Rect ? Rect.left + halfWidth : 0;
    const cardCenterY = Rect ? Rect.top + halfHeight : 0;

    const deltaX = mousePosition.x - cardCenterX;
    const deltaY = mousePosition.y - cardCenterY;

    rx.current = deltaY / halfHeight;
    ry.current = deltaX / halfWidth;

    distanceToCenter.current = Math.sqrt(
      Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
    );
    maxDistance.current = Math.max(halfWidth, halfHeight);

    deg.current = (distanceToCenter.current * 10) / maxDistance.current;
  }, [mousePosition]);

  useGSAP(() => {
    gsap.to(cardRef.current, {
      transform:
        isHovered && !itsFlipped
          ? `rotate3D(${-rx.current}, ${ry.current}, 0, ${deg.current}deg)`
          : `rotate3D(0, 0, 0, 0deg)`,
      duration: 0.2,
      perspective: 1000,
      transformStyle: "preserve-3d",
      willChange: "transform",
      ease: "power2.In",
    });
    gsap.to(glossRef.current, {
      transform: `translate(${ry.current * 100 * -1}%, ${
        rx.current * 100 * -1
      }%) scale(2.4)`,
      opacity: isHovered
        ? `${((distanceToCenter.current* 0.6) / maxDistance.current + 0.1)}`
        : "0",
      willChange: "transform, opacity",
      duration: 0.2,
      ease: "power2.Out",
      perspective: 1000,
      transformStyle: "preserve-3d",
    });
  }, [mousePosition]);

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
