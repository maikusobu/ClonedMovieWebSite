import { MovieType } from "../../../Type/MovieType";
import { movieidType } from "../SearchFilterContainer";
type ListGenreType = {
  genre_id: number;
  name: string;
  setMovieId: (movieId: movieidType) => void;
  movieId: movieidType;
};
function ListGenres({ genre_id, name, movieId, setMovieId }: ListGenreType) {
  return (
    <li
      data-id={genre_id}
      className={`m-1 inline-flex cursor-pointer rounded-3xl bg-slate-400 p-4 ${
        movieId.id.find((movieid) => movieid === genre_id) ? "bg-slate-600" : ""
      }`}
      onClick={() => {
        if (movieId.id.find((movieid) => movieid === genre_id)) {
          setMovieId({
            ...movieId,
            id: movieId.id.filter((movieid) => movieid !== genre_id),
          });
        } else {
          setMovieId({
            ...movieId,
            id: [...(movieId.id as number[]), genre_id as number] as number[],
          });
        }
      }}
    >
      {name}
    </li>
  );
}

export default ListGenres;
