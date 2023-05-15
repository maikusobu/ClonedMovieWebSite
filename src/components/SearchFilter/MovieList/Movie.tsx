import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { PopularStatus } from "../../HomePage/SliceApi/SliceApi";
import CircularBar from "../../CirculaBar/CircularBar";
import { Link } from "react-router-dom";

function Movie({
  id,
  isLast,
  newLimit,
  title,
  poster,
  overview,
  conti,
  release,
  vote,
}: {
  id: number;
  isLast: boolean;
  newLimit: () => void;
  title: string;
  poster: string;
  overview: string;
  conti: boolean;
  release?: string;
  vote: number;
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
      className=" relative flex  gap-2  overflow-hidden rounded-3xl shadow shadow-white md:flex-col "
    >
      <Link to={`/description/movie/${id}`}>
        <div className="items-start">
          <img
            src={`${import.meta.env.VITE_URL_IMAGE}${poster}`}
            width={100}
            className="h-[330px] w-full md:h-[260px]  md:w-full lg:h-[300px]"
            loading="lazy"
            alt={title}
          ></img>
        </div>
        <div className="border-3 relative flex-1 p-2">
          <div className="absolute top-0  right-0 translate-y-[-80%] translate-x-[-50%]  rounded-full">
            <div className="media_circle_progress h-[35px] w-[35px] rounded-full bg-black p-1 ">
              <CircularBar vote={vote} />
            </div>
          </div>
          <div className=" text-base md:text-lg">
            <h1 className="text-xl font-bold md:text-base">{title}</h1>
          </div>
          <div className=" text-sm md:hidden">
            <p>{overview} </p>
          </div>
          <div id="release_day " className="hidden md:block">
            {release}
          </div>
        </div>
      </Link>
    </div>
  );
}
export default Movie;
