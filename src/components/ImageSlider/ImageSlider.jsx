import { PopularMovies } from "../SliceApi/SliceApi";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { PopularStatus } from "../SliceApi/SliceApi";
import { AnimatePresence } from "framer-motion";
import { IconContext } from "react-icons";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from "framer-motion";
import "./ImageSlider.css";
import { FaPlayCircle } from "react-icons/fa";
import { toDate } from 'date-fns'

export function ImageSlider({}) {
  const variants = {
    initial: {
      x: 200,
    },
    animate: {
      x: 0,
    },
    exit: {
      x: -200,
    },
  };
   let dataDate = [];
  const PopularMoviesDB = useSelector(PopularMovies);
  const PopularStatusDB = useSelector(PopularStatus);
  const [index, setIndex] = useState(0);
  const [num, setNum] = useState(0);
  const imgSlide = useRef();
  
  const handleChange = (index) => {
    setIndex(index);
    setNum(index);
  };

  useEffect(() => {
    imgSlide.current = setInterval(() => {
      setNum((prev) => {
        if (prev === PopularMoviesDB.results.slice(0, 5).length - 1) return 0;
        else return prev + 1;
      });
      setIndex((prev) => {
        if (prev === PopularMoviesDB.results.slice(0, 5).length - 1) return 0;
        else return prev + 1;
      });
    }, 10000);
    return () => {
      clearInterval(imgSlide.current);
    };
  });
  if (PopularStatusDB == "success") {
  dataDate = [...toDate(new Date(PopularMoviesDB?.results[index].release_date.split("-")[0],PopularMoviesDB?.results[index].release_date.split("-")[1],PopularMoviesDB?.results[index].release_date.split("-")[2])).toString().split(" ")]
  

  
}

  if (PopularStatusDB == "pending") return <h1>Loading...</h1>;
  else if (PopularStatusDB == "success")
    return (
      <div className=" px-10 pt-10  flex ">
        <motion.div className="slideShow  w-1/3 relative" data-index={index}>
          <div className="absolute top-0 left-0 translate-x-[50%] translate-y-[-50%]rounded-full">
            <div className="w-[40px] h-[40px] bg-black rounded-full">
          <CircularProgressbar value={PopularMoviesDB.results[index].vote_average*10} text={`${PopularMoviesDB.results[index].vote_average*10}%`} />;
          </div>
          </div>
          <img
            key={PopularMoviesDB.results[index].title}
            className="aspect-[2/3] shadow-lg"
            src={`https://image.tmdb.org/t/p/w300${PopularMoviesDB.results[index].poster_path}`}
            width="300"
            alt={PopularMoviesDB.results[index].title}
          />

          <div className="flex justify-center w-1/2 mt-2">
            {PopularMoviesDB.results.slice(0, 5).map((movie, i) => (
              <div
                key={movie.title}
                className={"dot " + (num == i ? "active" : "")}
                onClick={(e) => {
                  handleChange(i);
                }}
              ></div>
            ))}
          </div>
        </motion.div>
        <div className="w-2/3">
          <figure>
            <figcaption>
              <h1 className="text-amber-500 text-5xl font-bold">
                {/* {PopularMoviesDB.results[index].title.length < 30
                  ? PopularMoviesDB.results[index].title
                  : PopularMoviesDB.results[index].title.substring(0, 10)} */}
                  {PopularMoviesDB.results[index].title}
              </h1>
            </figcaption>
            <p className=" pt-4 max-w-prose text-lg font-light text-neutral-50">
              {PopularMoviesDB.results[index].overview}
            </p>
            <div className="flex pt-4 pb-4 gap-4">
              {/* <p className=" p-2 rounded-full gradient text-zinc-900 font-medium text-lg">
                {PopularMoviesDB.results[index].vote_average}
              </p> */}
              <div>
               
                <IconContext.Provider
                  value={{ className: "", size: "3em", color: "white" }}
                >
                  <FaPlayCircle />
                </IconContext.Provider>
              </div>
              <div>
  
              </div>
            </div>
            <div className=" text-amber-500">{`${dataDate[2]}  ${dataDate[1]}  ${dataDate[3]}`}</div>
          </figure>
        </div>
      </div>
    );
}
