import { latestData } from "../SliceApi/SliceApiLatest";
import { latestStatus } from "../SliceApi/SliceApiLatest";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FaPlayCircle } from "react-icons/fa";
import { getLatestMovie } from "../SliceApi/SliceApiLatest";
import { getTrailer } from "../SliceApi/SliceApiLatest";
import { trailerStatus } from "../SliceApi/SliceApiLatest";
import { trailerData } from "../SliceApi/SliceApiLatest";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
export function LatestTrailer() {
  const dispatch = useDispatch();
  const data = useSelector(latestData);
  const status = useSelector(latestStatus);
  const dataVideo = useSelector(trailerData);
  const trailerSta = useSelector(trailerStatus);

  if (status == "success")
    return (
      <>
        <div className="media_heading_mobile_container h-[30px]">
          <h1
            className=" media_heading_mobile relative mb-12 inline-block text-2xl font-semibold  text-[#1D1E21]
        before:absolute before:-inset-3 before:z-[-1] before:block before:-skew-y-6 before:bg-[#FCD354]
        "
          >
            LASTEST TRAILER
          </h1>
        </div>
        <div
          id="list_content"
          className="flex flex-nowrap gap-10 overflow-x-scroll rounded-[10px]  border border-[10px] border-[rgb(133,_137,_148)] p-10 "
        >
          {data[0].results.map((movie) => {
            return (
              <Link
                key={movie.title}
                className="basis-200 relative shrink-0 grow-0  "
                to={`play/movie/${movie.id}`}
              >
                <motion.div whileHover={{ scale: "1.1" }}>
                  <IconContext.Provider
                    value={{
                      className: "absolute left-1/3 top-1/2 cursor-pointer ",
                      size: "3em",
                      color: "white",
                    }}
                  >
                    <FaPlayCircle />
                  </IconContext.Provider>

                  <img
                    className=""
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    width="200"
                    height="200"
                  />
                </motion.div>
              </Link>
            );
          })}
        </div>
      </>
    );
}
