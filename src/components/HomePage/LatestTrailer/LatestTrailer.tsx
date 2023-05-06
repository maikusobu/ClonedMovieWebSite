import { latestData } from "../SliceApi/SliceApiLatest";
import { latestStatus } from "../SliceApi/SliceApiLatest";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { FaPlayCircle } from "react-icons/fa";

import { motion } from "framer-motion";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { MovieType } from "../../../Type/MovieType";
let movies : MovieType[] = []
export function LatestTrailer() {
  const dispatch = useAppDispatch();
  const data: any = useAppSelector(latestData);
  const status = useAppSelector(latestStatus);
  if (status === "success")
   movies = data[0].results;
 
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
          {movies.map((movie) => {
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
                      src={`${import.meta.env.VITE_URL_IMAGE}${movie.backdrop_path}`}
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
  else {
    return <h1>Loading</h1>
  }
}
