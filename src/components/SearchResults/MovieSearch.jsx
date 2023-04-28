import { urlImage } from "../../apikey";
import { Link } from "react-router-dom";
function MovieSearch({ movie }) {
  return (
    <div
      id={movie.id}
      className=" relative flex gap-2 overflow-hidden rounded-3xl  shadow shadow-white md:flex-col lg:h-[400px]"
    >
      <Link to={`/description/movie/${movie.id}`}>
        <div className=" items-start">
          <img
            src={`${urlImage}${movie.poster_path}`}
            width={100}
            className=" h-full w-full md:h-[260px]  md:w-full lg:h-[300px]"
            loading="lazy"
            alt={movie.title}
          ></img>
        </div>
        <div className="border-3 flex-1 p-2">
          <div className=" text-base sm:text-lg">
            <h1 className="font-bold">{movie.title}</h1>
          </div>
          <div className=" text-xs sm:hidden">{movie.overview}</div>
        </div>
      </Link>
    </div>
  );
}

export default MovieSearch;
