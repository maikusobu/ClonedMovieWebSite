import { Link } from "react-router-dom";
function DropDownMovie({ movies, q }) {
  console.log(movies);
  if (movies != undefined)
    return (
      <>
        {movies.map((movie) => {
          if (typeof movie != String)
            return (
              <li
                key={movie.id}
                className=" relative  px-2 before:absolute before:top-full before:left-0 before:h-[1px] before:w-full before:bg-white hover:p-3 "
              >
                <Link className="group flex gap-2">
                  <div className=" hidden w-1/4 group-hover:block">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    />
                  </div>
                  <div className="w-full group-hover:w-3/4">
                    <h4 className=" group-hover:text-red-500 text-white">
                      {movie.title}
                    </h4>
                    <p className="  hidden  text-ellipsis group-hover:block ">
                      {`${movie.overview.substring(0, 120)} ..... `}
                    </p>
                  </div>
                </Link>
              </li>
            );
        })}
      </>
    );
  else {
    return <li className="w-full text-white"> Please Searching movie</li>;
  }
}

export default DropDownMovie;
