import { useParams, Navigate, useNavigate } from "react-router";
import { getHeroById } from "../helpers";
import { Button, HR } from "flowbite-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {  useMemo, useRef } from "react";
import { useCardAnimation3D } from "../hooks/useCardAnimation3D";

gsap.registerPlugin(useGSAP);

export const HeroPage = () => {
  const params = useParams();
  const hero = useMemo(() => (params.id ? getHeroById(params.id) : null), [params.id]);
  const cardRef = useRef<HTMLDivElement>(null);
  const glossRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const {setIsHovered } = useCardAnimation3D({cardRef, glossRef});



  const onNavigateBack = () => {
    navigate(-1);
  }


  if (!hero) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container  px-5 py-5">
      <h1 className="text-5xl font-bold">{hero?.superhero}</h1>
      <HR className="min-w-full dark:bg-white" />
      <div className=" p-5 sm:p-0 flex flex-col items-center justify-center sm:flex-row sm:items-start cristal backdrop-blur-lg rounded-lg shadow-lg animate__animated animate__fadeInLeft">
        <div
          className="relative w-full sm:w-1/2 overflow-hidden "
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
