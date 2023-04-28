import {
  getPopularMovie,
  PopularMovies,
  PopularStatus,
} from "../../HomePage/SliceApi/SliceApi";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import Movie from "./Movie";

function MovieList({ movieId, setMovieId }) {
  const [conti, setConti] = useState(false);
  const results = useSelector(PopularMovies);
  console.log(results);
  const dispatch = useDispatch();

  const status = useSelector(PopularStatus);

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
            popularity={result.vote_average}
            poster={result.poster_path}
            overview={result.overview}
            conti={conti}
          />
        ))}

        {status === "pending" && <h1 className="text-center">Pending....</h1>}
      </div>
      {!conti && (
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
