import { Link } from "react-router-dom";
import { useReleaseDay } from "../../../useReleaseDay/useReleaseDay";
function DropDownMovie({ movies, q, setIsMouse, isMouse, setMovieDown }) {
  console.log(movies);
  if (movies != undefined)
    return (
      <>
        {movies
          .map((movie) => {
            if (typeof movie != String)
              return (
                <li
                  key={movie.id}
                  className=" relative  px-2 before:absolute before:top-full before:left-0 before:h-[1px] before:w-full before:bg-white hover:p-3 "
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
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
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
          .slice(0, 10)}
        <li>
          <button type="button">Xem tiếp</button>
        </li>
      </>
    );
  else {
  }
}

export default DropDownMovie;
