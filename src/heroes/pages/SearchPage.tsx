import { Button, HR, Label, TextInput } from "flowbite-react";
import { HeroCard } from "../components/HeroCard";

export const SearchPage = () => {
  return (
    <div className="w-svw p-4">
      <h1 className="text-3xl">Search Page</h1>
      <HR />
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:flex-2 w-full sm:w-[300px] ">
          <h4 className="text-xl">Searching</h4>
          <HR className="my-2" />
          <form action="">
            <div>
              <div className="mb-2  ">
                <Label htmlFor="search" value="Search a hero" />
              </div>
              <TextInput id="search" type="text" placeholder="" />
            </div>
            <Button className="mt-4" type="submit">
              Submit
            </Button>
          </form>
        </div>
        <div className=" sm:flex-1 ">
          <h4 className="text-xl">Results</h4>
          <HR className="my-2" />
          <div
            className="bg-blue-300   text-blue-700 px-4 py-3 rounded-xl relative mt-3"
            role="alert"
          >
            <span className="block sm:inline">
              Search a hero 
            </span>
          </div>
          <div
            className="bg-red-300   text-red-700 px-4 py-3 rounded-xl relative mt-3"
            role="alert"
          >
            <span className="block sm:inline">
              There's no results
            </span>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            <HeroCard
              id="marvel-spider"
              superhero="Spider-Man"
              publisher="Marvel Comics"
              alter_ego="Peter Parker"
              first_appearance="Amazing Fantasy #15"
              characters="Peter Parker"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
