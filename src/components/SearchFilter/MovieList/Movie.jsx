import { useRef, useEffect } from "react";
import { urlImage } from "../../../apikey";
import { useSelector } from "react-redux";
import { PopularStatus } from "../../HomePage/SliceApi/SliceApi";
function Movie({
  id,
  isLast,
  newLimit,
  title,
  poster,
  popularity,
  overview,
  conti,
}) {
  const movieRef = useRef();
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
      id={id}
      ref={movieRef}
      className="flex gap-2 overflow-hidden rounded-3xl  shadow-lg shadow"
    >
      <div className=" items-start">
        <img
          src={`${urlImage}${poster}`}
          width={150}
          className="h-full"
          loading="lazy"
          alt={title}
        ></img>
      </div>
      <div className="border-3 flex-1 p-2">
        <div className="text-lg">
          <h1 className="font-bold">{title}</h1>
        </div>
        <div>
          <p className=" text-base">{overview.substring(0, 100)}...</p>
        </div>
        <div>{popularity}</div>
      </div>
    </div>
  );
}

export default Movie;
