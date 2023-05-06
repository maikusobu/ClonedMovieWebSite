
import { MovieType } from "../../../Type/MovieType";
export const Movie = ({ movie } : {movie : MovieType}) => {
  return (
    <div className="">
      <div className="">
        <h1>{movie.title}</h1>
      </div>
      <div>
        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
      </div>
      <div>{movie.vote_average}</div>
    </div>
  );
};
