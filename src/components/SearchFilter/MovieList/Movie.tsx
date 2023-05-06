import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { PopularStatus } from "../../HomePage/SliceApi/SliceApi";
import { Link } from "react-router-dom";
function Movie({ id, isLast, newLimit, title, poster, overview, conti } : {id: number, isLast: boolean, newLimit: () => void, title: string, poster: string, overview: string, conti: boolean
// eslint-disable-next-line react/prop-types
}) {
  const movieRef = useRef<HTMLDivElement>(null);
  const status = useSelector(PopularStatus);
  useEffect(() => {
    if (!movieRef?.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting && conti) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });
    observer.observe(movieRef.current);
  }, [isLast, conti]);
  return (
    <div
      id={`${id}`}
      ref={movieRef}
      className=" relative flex gap-2 overflow-hidden rounded-3xl  shadow shadow-white md:flex-col lg:h-[400px]"
    >
      <Link to={`/description/movie/${id}`}>
        <div className=" items-start">
          <img
            src={`${import.meta.env.VITE_URL_IMAGE}${poster}`}
            width={100}
            className=" h-full w-full md:h-[260px]  md:w-full lg:h-[300px]"
            loading="lazy"
            alt={title}
          ></img>
        </div>
        <div className="border-3 flex-1 p-2">
          <div className=" text-base md:text-lg">
            <h1 className="font-bold">{title}</h1>
          </div>
          <div className=" text-xs md:hidden">{overview}</div>
        </div>
      </Link>
    </div>
  );
}

export default Movie;
