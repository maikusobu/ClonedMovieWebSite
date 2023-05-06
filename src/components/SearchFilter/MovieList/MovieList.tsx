import {
  getPopularMovie,
  PopularMovies,
  PopularStatus,
} from "../../HomePage/SliceApi/SliceApi";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { MovieType } from "../../../Type/MovieType";
import { useEffect, useState } from "react";
import Movie from "./Movie";
import { movieidType } from "../SearchFilterContainer";
type MovieList = {
  movieId: movieidType ;
  setMovieId: (movieId: movieidType) => void;
}
function MovieList({ movieId, setMovieId }: MovieList) {
  const [conti, setConti] = useState(false);
 const results = useAppSelector(PopularMovies);

  const dispatch = useAppDispatch();

  const status = useAppSelector(PopularStatus);

  useEffect(() => {
    dispatch(getPopularMovie(movieId));
  }, [movieId.page]);

  return (
    <div>
      <div className="space-y-8 p-[40px] md:grid md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]    md:justify-between md:gap-4 md:space-y-0 md:p-4">
        {results.map((result, i) => (
          <Movie
            newLimit={() =>
              setMovieId({
                ...movieId,
                page: movieId.page + 1,
              })
            }
            isLast={i === results.length - 1}
            key={result.id}
            id={result.id}
            title={result.title}
      
            poster={result.poster_path}
            overview={result.overview}
            conti={conti}
          />
        ))}

        {status === "pending" && <h1 className="text-center">Pending....</h1>}
      </div>
      {!conti && results.length > 0 && (
        <div
          onClick={() => {
            setConti(true);
            setMovieId({
              ...movieId,
              page: movieId.page + 1,
            });
          }}
          className=" flex h-[40px] w-[100%] cursor-pointer justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600"
        >
          <button>Xem Tiếp</button>
        </div>
      )}
    </div>
  );
}

export default MovieList;
