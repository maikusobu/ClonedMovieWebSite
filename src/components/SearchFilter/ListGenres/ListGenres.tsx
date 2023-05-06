
import { MovieType } from "../../../Type/MovieType";
type ListGenreType = {
  id: number;
  name: string;
  setMovieId: (movieId: {    id: number,
    page: number,
    sort: string
    min: number,
    max: number,} ) => void;
  movieId: {
        id: number,
    page: number,
    sort: string
    min: number,
    max: number,
  }
}
function ListGenres({ id, name, movieId, setMovieId } : ListGenreType) {
  return (
    <li
      data-id={id}
      className={`m-1 inline-flex cursor-pointer rounded-3xl bg-slate-400 p-4 ${
        id === movieId.id ? "bg-slate-600" : ""
      }`}
      onClick={() => {
        setMovieId({
          ...movieId,
          id: id,
         
        });
      }}
    >
      {name}
    </li>
  );
}

export default ListGenres;
