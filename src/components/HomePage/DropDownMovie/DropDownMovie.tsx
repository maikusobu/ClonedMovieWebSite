import { Link } from "react-router-dom";
import { useReleaseDay } from "../../../useReleaseDay/useReleaseDay";
import { MovieType } from "../../../Type/MovieType";
import { useNavigate } from "react-router-dom";
type DropDownMovieProps = {
  movies: MovieType[];
  q: string;
  setIsMouse: (isMouse: boolean) => void;
  isMouse: boolean;
  setMovieDown(movieDown: boolean): void;
};

function DropDownMovie({
  movies,
  setIsMouse,
  setMovieDown,
  q,
}: DropDownMovieProps) {
  const navigate = useNavigate();
  if (movies != undefined && movies.length > 0)
    return (
      <>
        {movies
          .map((movie: MovieType) => {
            return (
              <li
                key={movie.id}
                className=" relative py-2  px-2 before:absolute before:top-full
                 before:left-0 before:h-[1px] before:w-full before:bg-white  hover:p-3"
                onMouseEnter={() => setIsMouse(true)}
                onMouseLeave={() => setIsMouse(false)}
                onClick={() => {
                  setIsMouse(false);
                  setMovieDown(false);
                }}
              >
                <Link
                  className="group flex gap-2"
                  to={`/description/movie/${movie.id}`}
                >
                  <div className="  block w-1/4">
                    <img
                      src={`${import.meta.env.VITE_URL_IMAGE}original${
                        movie.poster_path
                      }`}
                    />
                  </div>
                  <div className="w-full group-hover:w-3/4">
                    <h4 className=" group-hover:text-red-500 text-xl text-yellow">
                      {movie.title}
                    </h4>
                    <p className="block text-ellipsis text-base text-white ">
                      {useReleaseDay(movie)}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })
          .slice(0, 4)}
        <li className="hover:bg-slate-700/60">
          <button
            type="button"
            className="mt-0 w-full text-center align-middle text-base text-white"
            onClick={() => {
              if (q !== "") {
                navigate(`/search/${q}`);
              }
            }}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            Xem tiếp
          </button>
        </li>
      </>
    );
  else {
    return <></>;
  }
}

export default DropDownMovie;
