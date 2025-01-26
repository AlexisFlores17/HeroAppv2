import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "./index.css";
import HeroesApp from "./HeroesApp.tsx";
import { Flowbite } from "flowbite-react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Flowbite theme={{mode: "dark"}}>
      <BrowserRouter>
        <HeroesApp />
      </BrowserRouter>
    </Flowbite>
  </StrictMode>
);
