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
      <div>
        <h1>Movies</h1>
      </div>
      <div className="space-y-8 p-3">
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
            popularity={result.popularity}
            poster={result.poster_path}
            overview={result.overview}
            conti={conti}
          />
        ))}

        {!conti && (
          <div
            onClick={() => {
              setConti(true);
              setMovieId({
                ...movieId,
                page: movieId.page + 1,
              });
            }}
            className=" flex h-[40px] cursor-pointer justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            <button>Xem Tiếp</button>
          </div>
        )}
        {status === "pending" && <h1 className="text-center">Pending....</h1>}
      </div>
    </div>
  );
}

export default MovieList;
