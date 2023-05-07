import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { PopularStatus } from "../../HomePage/SliceApi/SliceApi";
import { Link } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
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
}: // release,
{
  id: number;
  isLast: boolean;
  newLimit: () => void;
  title: string;
  poster: string;
  overview: string;
  conti: boolean;
  release?: string;
  vote: number;
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
            <div className="media_circle_progress h-[30px] w-[30px] rounded-full bg-black ">
              <CircularProgressbar
                value={vote * 10}
                text={`${vote ? vote : "?"}`}
                strokeWidth={12}
                styles={{
                  root: {},
                  path: {
                    stroke: `${
                      vote * 10 >= 70
                        ? "#dc2430"
                        : vote * 10 >= 50
                        ? "#7b4397"
                        : "#01c6ac"
                    }`,
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                  },
                  trail: {
                    stroke: "#d6d6d6",
                  },
                  text: {
                    fill: " #FCD354",
                    fontSize: "40px",
                    fontWeight: "500",
                  },
                }}
              />
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
