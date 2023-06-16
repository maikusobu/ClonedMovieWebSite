import { Link } from "react-router-dom";
import { MovieType } from "../../Type/MovieType";
import CircularBar from "../CirculaBar/CircularBar";
import { releaseDay } from "../../Helper/releaseDay";
function MovieSearch({ movie }: { movie: MovieType }) {
  return (
    <div
      id={Number(movie.id).toString()}
      className=" relative flex  gap-2  overflow-hidden rounded-3xl shadow shadow-white md:flex-col "
    >
      <Link to={`/description/movie/${movie.id}`}>
        <div className="items-start">
          <img
            src={`${import.meta.env.VITE_URL_IMAGE}original${
              movie.poster_path
            }`}
            width={100}
            className="h-[330px] w-full md:h-[260px]  md:w-full lg:h-[300px]"
            loading="lazy"
            alt={movie.title}
          ></img>
        </div>
        <div className="border-3 relative flex-1 p-2">
          <div className="absolute top-0  right-0 translate-y-[-80%] translate-x-[-50%]  rounded-full">
            <div className="media_circle_progress h-[35px] w-[35px] rounded-full bg-black p-1 ">
              <CircularBar vote={movie.vote_average} />
            </div>
          </div>
          <div className=" text-base md:text-lg">
            <h1 className="text-xl font-bold md:text-base">{movie.title}</h1>
          </div>
          <div className=" text-sm md:hidden">
            <p>{movie.overview} </p>
          </div>
          <div id="release_day " className="hidden md:block">
            {releaseDay(movie)}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieSearch;
