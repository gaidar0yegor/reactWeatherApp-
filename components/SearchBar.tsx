import { ChangeEvent, useState } from "react";
import { FcSearch } from "react-icons/fc";
import { resultType } from "../types";

export const SearchBar = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<[]>([]);

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setSearchResults(data));
  };

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);

    if (value === "") return;

    getSearchOptions(value);
  };

  const onClickResult = (result: resultType) => {
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${result.lat}&lon=${result.lon}&exclude={part}&appid=${process.env.REACT_APP_API_KEY}
      }`
    );
  };

  return (
    <form className="w-[320px]">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative w-full">
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 bg-opacity-40 backdrop-blur-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Paris..."
          value={search}
          onChange={onValueChange}
          required
        />
        <div className="text-white absolute left-1.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-xl px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <FcSearch />
        </div>
        {search ? (
          <div className="absolute w-full p-4 top-14 text-sm bg-gray-50 bg-opacity-40 rounded-lg backdrop-blur-md text-gray-900 border border-gray-300">
            {searchResults.map((result: resultType, index: number) => (
              <li
                key={result.name + "-" + index}
                className="hover:bg-gray-300 cursor-pointer list-none"
              >
                <button onClick={() => onClickResult}>{result.name}</button>
              </li>
            ))}
          </div>
        ) : null}
      </div>
    </form>
  );
};
