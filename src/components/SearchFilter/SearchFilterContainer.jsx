import MovieList from "./MovieList/MovieList";
import SortFilter from "./SortFilter";
import { useState } from "react";
function SearchFilterContainer() {
  const [movieId, setMovieId] = useState({
    id: null,
    page: 1,
    sort: "popularity.desc",
  });
  return (
    <>
      <div>
        <SortFilter
          movieId={movieId}
          setMovieId={(movieId) => setMovieId(movieId)}
        />
      </div>
      <div>
        <MovieList
          movieId={movieId}
          setMovieId={(movieId) => setMovieId(movieId)}
        />
      </div>
    </>
  );
}

export default SearchFilterContainer;
