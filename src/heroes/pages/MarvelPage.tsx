import { HR } from "flowbite-react";
import { HeroList } from "../components";


export const MarvelPage = () => {
  return (
    <div className={`marvel-page  h-full overflow-hidden`}>
 
        <div className="backdrop-blur-[3px] p-5 sm:px-2 ">
          <h1 className="text-5xl font-bold ">Marvel Comics</h1>
          
          <HR className="min-w-full dark:bg-white" />
          <HeroList publisher="Marvel Comics" />
        </div>

    </div>
  )
}
