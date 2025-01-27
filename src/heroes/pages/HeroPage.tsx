import { useParams, Navigate, useNavigate } from "react-router";
import { getHeroById } from "../helpers";
import { Button, HR } from "flowbite-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMousePosition } from "../hooks/useMousePosition";

gsap.registerPlugin(useGSAP);

export const HeroPage = () => {
  const params = useParams();
  const hero = useMemo(() => (params.id ? getHeroById(params.id) : null), [params.id]);
  const cardRef = useRef<HTMLDivElement>(null);
  const glossRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePosition = useMousePosition();
  const rx = useRef(0);
  const ry = useRef(0);
  const deg = useRef(0);
  const distanceToCenter = useRef(0);
  const maxDistance = useRef(0);
  const navigate = useNavigate();



  const onNavigateBack = () => {
    navigate(-1);
  }

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
      transform: isHovered
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
        ? `${(distanceToCenter.current * 0.6) / maxDistance.current}`
        : "0",
      willChange: "transform, opacity",
      duration: 0.2,
      ease: "power2.Out",
      perspective: 1000,
      transformStyle: "preserve-3d",
    });
  }, [mousePosition]);

  if (!hero) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container  px-5 py-5">
      <h1 className="text-5xl font-bold">{hero?.superhero}</h1>
      <HR className="min-w-full dark:bg-white" />
      <div className=" px-5 sm:px-0 flex flex-col items-center justify-center sm:flex-row sm:items-start cristal backdrop-blur-lg rounded-lg shadow-lg animate__animated animate__fadeInLeft">
        <div
          className="hero-image w-full sm:w-1/2 overflow-hidden  "
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={cardRef}
        >
          <img
            className="object-fill  w-full max-h-[500px] sm:max-h-[600px]"
            src={`/assets/${hero.id}.jpg`}
            alt="hero-image"
          />
          <div
            className="gloss-card"
            ref={glossRef}
          />
        </div>
        <div className=" m-5 sm:mx-10  w-full sm:w-1/2 lg:w-3/4">
          <h1 className="text-3xl">
            <span className="font-bold">Alter ego: </span>
            {hero.alter_ego}
          </h1>
          <HR className="dark:bg-white my-4 sm:my-6" />
          {hero.alter_ego !== hero.characters && (
            <h2 className="text-xl">
              <span className="font-bold">Characters: </span>
              {hero.characters}
            </h2>
          )}
          <p className="text-xl">
            <span className="font-bold">First appearance: </span>
            {hero.first_appearance}
          </p>
          <p className="text-xl">
            <span className="font-bold">Publisher: </span>
            {hero.publisher}
          </p>

          <Button onClick={onNavigateBack} className="mt-5" >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
