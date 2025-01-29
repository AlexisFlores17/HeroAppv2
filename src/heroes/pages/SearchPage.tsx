import { Button, HR, Label, TextInput } from "flowbite-react";
import { HeroCard } from "../components/HeroCard";
import { useForm } from "../../hooks/useForm";
import { useLocation, useNavigate } from "react-router";
import queryString from "query-string";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { q = "" } = queryString.parse(location.search);
  const { formState, onInputChange } = useForm({
    initialForm: { searchText: q as string },
  });
  const { searchText } = formState;
  const heroes = getHeroesByName(q as string);

  const showSearch = (q?.length ===0);
  const showError = ((q ?? "").length > 0) && (heroes.length === 0);

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (searchText.trim().length <= 1) return;

    navigate(`?q=${searchText.toLocaleLowerCase().trim()}&asc=true`);
  };

  return (
    <div className="w-screen p-4">
      <h1 className="text-3xl">Search Page</h1>
      <HR />
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:flex-2 w-full sm:w-[300px] ">
          <h4 className="text-xl">Searching</h4>
          <HR className="my-2" />
          <form onSubmit={onSearchSubmit}>
            <div>
              <div className="mb-2  ">
                <Label htmlFor="search" value="Search a hero" />
              </div>
              <TextInput
                id="search"
                type="text"
                placeholder=""
                name="searchText"
                value={searchText}
                onChange={onInputChange}
              />
            </div>
            <Button className="mt-4" type="submit">
              Submit
            </Button>
          </form>
        </div>
        <div className=" sm:flex-1 ">
          <h4 className="text-xl">Results</h4>
          <HR className="my-2" />
          {/* {q === "" ? (
            <div
              className="bg-blue-300   text-blue-700 px-4 py-3 rounded-xl relative mt-3"
              role="alert"
            >
              <span className="block sm:inline">Search a hero</span>
            </div>
          ) : (
            heroes.length === 0 && (
              <div
                className="bg-red-300   text-red-700 px-4 py-3 rounded-xl relative mt-3"
                role="alert"
              >
                <span className="block sm:inline">
                  There's no results for {q}
                </span>
              </div>
            )
          )} */}

          <div
            className="animate__animated animate__fadeIn bg-blue-300   text-blue-700 px-4 py-3 rounded-xl relative mt-3"
            role="alert"
            style={{ display: showSearch? "" : "none" }}
          >
            <span className="block sm:inline">Search a hero</span>
          </div>

          <div
            className="animate__animated animate__fadeIn bg-red-300   text-red-700 px-4 py-3 rounded-xl relative mt-3"
            role="alert"
            style={{ display: showError? "" : "none" }}
          >
            <span className="block sm:inline">There's no results for {q}</span>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center sm:flex-row sm:flex-wrap gap-4">
            {heroes.map((hero) => (
              <HeroCard key={hero.id} {...hero} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
