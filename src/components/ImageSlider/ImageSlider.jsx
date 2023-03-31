import { PopularMovies } from "../SliceApi/SliceApi";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { PopularStatus } from "../SliceApi/SliceApi";
import { AnimatePresence } from "framer-motion";
import { IconContext } from "react-icons";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from "framer-motion";
import "./ImageSlider.css";
import { FaPlayCircle } from "react-icons/fa";
import { toDate } from 'date-fns'
import { useReleaseDay } from "../../useReleaseDay/useReleaseDay";

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
    const movie = PopularMoviesDB?.results[index];
    console.log(movie)
    dataDate = [...useReleaseDay(movie)];
  }
  if (PopularStatusDB == "pending") return <h1>Loading...</h1>;
  else if (PopularStatusDB == "success")
    return (
      <div className=" px-10 pt-10  flex ">
        <motion.div className="slideShow  w-1/3 relative" data-index={index}>
          <div className="absolute top-0 right-10 translate-x-[50%] translate-y-[-50%]rounded-full">
            <div className="w-[40px] h-[40px] bg-black rounded-full ">
          <CircularProgressbar value={PopularMoviesDB.results[index].vote_average*10} 
          text={`${PopularMoviesDB.results[index].vote_average}`}
          strokeWidth={12}
          styles={{
            root: {},
            path: {
              stroke: ' #dc2430',
              strokeLinecap: 'butt',
              transition: 'stroke-dashoffset 0.5s ease 0s',
            },
            trail: {
              stroke: '#d6d6d6',
            },
            text: {
              fill: ' #FCD354',
              fontSize: '40px',
              fontWeight: "500",
            },
            backgroundColor: "#301816"
          }}

         />;
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
              <h1 className="text-[#FCD354] text-5xl font-bold">
                {/* {PopularMoviesDB.results[index].title.length < 30
                  ? PopularMoviesDB.results[index].title
                  : PopularMoviesDB.results[index].title.substring(0, 10)} */}
                  {PopularMoviesDB.results[index].title}
              </h1>
            </figcaption>
            <p className=" pt-4 max-w-prose text-lg font-light text-neutral-50 
  first-letter:text-5xl first-letter:font-bold first-letter:text-[#dc2430]
  first-letter:mr-3 first-letter:float-left">
              {PopularMoviesDB.results[index].overview}
            </p>
            <div className="flex pt-4 pb-4 gap-4">
              {/* <p className=" p-2 rounded-full gradient text-zinc-900 font-medium text-lg">
                {PopularMoviesDB.results[index].vote_average}
              </p> */}
              <div>
               
                <IconContext.Provider
                  value={{ className: "", size: "3em", color: "#FCD354" }}
                >
                  <FaPlayCircle />
                </IconContext.Provider>
              </div>
              <div>
  
              </div>
            </div>
            <div className=" text-white">{`${dataDate[2]}  ${dataDate[1]}  ${dataDate[3]}`}</div>
          </figure>
        </div>
      </div>
    );
}
