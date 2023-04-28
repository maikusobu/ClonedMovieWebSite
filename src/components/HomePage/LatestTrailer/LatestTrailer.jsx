import { latestData } from "../SliceApi/SliceApiLatest";
import { latestStatus } from "../SliceApi/SliceApiLatest";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FaPlayCircle } from "react-icons/fa";

import { motion } from "framer-motion";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
export function LatestTrailer() {
  const dispatch = useDispatch();
  const data = useSelector(latestData);
  const status = useSelector(latestStatus);
  // const imgStyle = {
  //   backgroundImage: `url(https://image.tmdb.org/t/p/original${data[0].results[0].backdrop_path})`,
  // };

  if (status == "success")
    return (
      <>
        <div className="media_heading_mobile_container my-6 h-[30px]">
          <h1
            className=" media_heading_mobile relative  mb-12 inline-block text-2xl  font-semibold
        text-[#1D1E21] before:absolute before:-inset-3 before:z-[-1] before:block before:-skew-y-6 before:bg-[#FCD354]
        "
          >
            LASTEST TRAILER
          </h1>
        </div>
        <div
          id="list_content"
          className="flex flex-nowrap gap-4 overflow-x-scroll rounded-[10px] border border-[10px]  border-[rgb(133,_137,_148)] p-4 md:gap-10"
        >
          {data[0].results.map((movie) => {
            return (
              <Link
                key={movie.title}
                className="basis-200 relative block shrink-0 grow-0"
                to={`play/movie/${movie.id}`}
              >
                <motion.div whileHover={{ scale: "1.1" }} className="h-full">
                  <IconContext.Provider
                    value={{
                      className:
                        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ",
                      size: "3em",
                      color: "#dc2430",
                    }}
                  >
                    <FaPlayCircle />
                  </IconContext.Provider>
                  <div className="h-full w-full">
                    <img
                      className="block h-full rounded-lg"
                      loading="lazy"
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      width="300"
                      height="200"
                    />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </>
    );
}
