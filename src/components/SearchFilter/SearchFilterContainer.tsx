import MovieList from "./MovieList/MovieList";
import SortFilter from "./SortFilter";
import { useState, useEffect } from "react";
import { Navbar } from "../HomePage/Navbar/Navbar";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../../Type/loaderType";
import { loader } from "../HomePage/Layout/Layout";
export type movieidType = {
  id: number[];
  page: number;
  sort: string;
  min: number;
  max: number;
};

function SearchFilterContainer() {
  const [valueUserVote, setValueUserVote] = useState([0, 100]);
  const { movies, q } = useLoaderData() as LoaderData<typeof loader>;
  const [movieId, setMovieId] = useState({
    id: [] as number[],
    page: 1,
    sort: "popularity.desc",
    min: valueUserVote[0],
    max: valueUserVote[1],
  });
  // Dùng để chứa search và filter
  return (
    <>
      <div
        className=" absolute z-[-50]  h-auto min-h-full w-full bg-slate-900"
        id="child"
      ></div>
      <div className="blob"></div>
      <Navbar movies={movies!} q={q ? q : ""} />
      <div className=" overflow-x-hidden bg-transparent text-white md:flex">
        <div className="md:w-1/4">
          <SortFilter
            movieId={movieId}
            setMovieId={(movieId: movieidType) => setMovieId(movieId)}
            valueUserVote={valueUserVote}
            setValueUserVote={(valueUserVote) =>
              setValueUserVote(valueUserVote)
            }
          />
        </div>
        <div className="md:flex-1" id="parent">
          <MovieList
            movieId={movieId}
            setMovieId={(movieId: movieidType) => setMovieId(movieId)}
          />
        </div>
      </div>
    </>
  );
}

export default SearchFilterContainer;
