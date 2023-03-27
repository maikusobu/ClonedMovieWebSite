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
      <div
        id="video_latest"
        className="flex flex-nowrap overflow-x-scroll gap-10 p-10 "
      >
        {data[0].results.map((movie) => {
          return (
            <Link
              key={movie.title}
              className="grow-0 shrink-0 basis-200 relative  "
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
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  width="200"
                  height="200"
                />
              </motion.div>
            </Link>
          );
        })}
      </div>
    );
}
