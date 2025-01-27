import { Routes, Route, Navigate } from "react-router";

import { NavMenu } from "../../ui";
import { MarvelPage, DcPage, HeroPage, SearchPage } from "../pages";

export const HeroesRoutes = () => {
  return (
    <>
      <NavMenu />

      <div className="  sm:flex flex-col items-center  animate__animated animate__fadeIn ">
        <Routes>
          <Route path="marvel" element={<MarvelPage />} />
          <Route path="dc" element={<DcPage />} />
          <Route path="hero/:id" element={<HeroPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="/" element={<Navigate to="marvel" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};
