import { genreSelector } from "../HomePage/SliceApi/SliceApi";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { useEffect, useState } from "react";
import { getGenre } from "../HomePage/SliceApi/SliceApi";
import ListGenres from "./ListGenres/ListGenres";

import RangeSliderInput from "./RangeSlider/RangeSlider";
import "react-range-slider-input/dist/style.css";
import { getPopularMovie } from "../HomePage/SliceApi/SliceApi";
import { RemoveData } from "../HomePage/SliceApi/SliceApi";
import { MovieType } from "../../Type/MovieType";
import { RootState } from "../../App/store";
import { movieidType } from "./SearchFilterContainer";
type sortFilter = {
  movieId: movieidType;
  setMovieId: (movieId: movieidType) => void;
  valueUserVote: number[];
  setValueUserVote: (valueUserVote: number[]) => void;
};
function SortFilter({
  movieId,
  setMovieId,
  valueUserVote,
  setValueUserVote,
}: sortFilter) {
  const data = useAppSelector(genreSelector);
  const [valueSort, setValueSort] = useState("Popularity Descending");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGenre());
  }, []);
  return (
    <div className="space-y-2 p-4 text-white">
      <details className=" group overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 transition">
          <span className="text-sm font-medium">Sort</span>
          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>

        <label
          htmlFor="Sort"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Sorted based on the results
        </label>
        <select
          onChange={(e) => {
            setMovieId({
              ...movieId,
              sort: e.target.value,
            });
          }}
          id="Sort"
          className="block w-full rounded-lg border border-gray-300 bg-transparent bg-gray-50 p-2.5 px-4 py-2.5 text-sm  text-gray-900 focus:border-none  focus:shadow-none focus:outline-none  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-none "
        >
          <option value="popularity.desc">Popularity Descending</option>
          <option value="popularity.asc">Popularity Ascending</option>
          <option value="vote_average.desc">Rating Descending</option>
          <option value="vote_average.asc">Rating ascending</option>
        </select>
      </details>

      <details className="group  overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 transition">
          <span className="text-sm font-medium">Filter by Genres</span>

          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>
        <div>
          <ul>
            {data.map((genre) => (
              <ListGenres
                key={genre.id}
                genre_id={genre.id}
                name={genre.name}
                movieId={movieId}
                setMovieId={(movieId) => setMovieId(movieId)}
              />
            ))}
          </ul>
        </div>
      </details>
      <details className=" group overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 transition">
          <span className="text-sm font-medium"> Filter by UserScores </span>

          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>
        <div className="flex flex-col gap-5 p-4 ">
          <RangeSliderInput
            valueUserVote={valueUserVote}
            setValueUserVote={(value) => setValueUserVote(value)}
            movieId={movieId}
            setMovieId={(movieId) => setMovieId(movieId)}
          />
        </div>
      </details>
      <div
        className=" cursor-pointer rounded-full bg-sky-400 p-3 text-center "
        onClick={(e) => {
          dispatch(RemoveData());
          dispatch(getPopularMovie(movieId));
        }}
      >
        <button type="button">Seacrh</button>
      </div>
    </div>
  );
}

export default SortFilter;
