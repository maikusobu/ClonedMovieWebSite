import { Navigate, Outlet } from "react-router-dom";

import "./Layout.css";
import { useRef, useState, useEffect, useMemo } from "react";
import { animate, AnimatePresence, motion } from "framer-motion";
import { CateogySelect } from "../CaterogySelect/CaterogySelect";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getGenre } from "../SliceApi/SliceApi";
import { Pagination } from "../Pagination/Pagination";
import { createPortal } from "react-dom";
import { Navbar } from "../Navbar/Navbar";
import { getListGenre } from "../SliceApi/SliceApi";
import { statusType } from "../SliceApi/SliceApi";
import { PopularStatus } from "../SliceApi/SliceApi";
import { PopularMovies } from "../SliceApi/SliceApi";

import { genreSelector } from "../SliceApi/SliceApi";
import { getPopularMovie } from "../SliceApi/SliceApi";
import { ImageSlider } from "../ImageSlider/ImageSlider";
import { LatestTrailer } from "../LatestTrailer/LatestTrailer";
import { useNavigate } from "react-router-dom";
import { listGenres } from "../SliceApi/SliceApi";
import { useParams } from "react-router-dom";
import { SlideMovive } from "../SlideMovie/SlideMovie";
import useScrollPosition from "@react-hook/window-scroll";
import { useLoaderData } from "react-router-dom";
import { getTheMovie } from "../Navbar/Helper";
import { getLatestMovie } from "../SliceApi/SliceApiLatest";
let PageSize = 20;
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("search");
  const movies = await getTheMovie(q);
  return { movies, q };
}
export const Layout = () => {
  let data = 0;
  const scrollY = useScrollPosition(30);
  const { movies, q } = useLoaderData();
  const [scrollPos, setScrollPos] = useState(localStorage.getItem("scroll"));
  let { pageId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genre = useSelector(genreSelector);
  const [page, setPage] = useState(1);
  const [inputText, setInputText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tick, setTick] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [num, setNum] = useState(0);
  const [index, setIndex] = useState(0);
  const statusTyp = useSelector(statusType);
  const [genreId, setGenreId] = useState(``);
  const PopularMoviesDB = useSelector(PopularMovies);
  const PopularStatusDB = useSelector(PopularStatus);
  const pageRef = useRef();
  const ListGenreData = useSelector(listGenres);
  if (statusTyp === "idle") {
    data = PopularMoviesDB;
  } else {
    data = ListGenreData;
  }

  const handleChangeId = (value) => {
    setGenreId(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(e.target.value);
    setInputText(!inputText);
  };
  const handleSetPage = (page) => {
    setCurrentPage(page);
    if (statusTyp === "idle") {
      dispatch(getPopularMovie(pageId));
    } else {
      dispatch(getListGenre({ id: genreId, page: pageId }));
    }
  };
  const variants = {
    initial: {
      x: 200,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };
  useEffect(() => {
    dispatch(getLatestMovie());
  }, []);

  useEffect(() => {
    if (statusTyp === "idle") {
      dispatch(getPopularMovie(pageId));
      setCurrentPage(Number(pageId));
    } else {
      dispatch(getListGenre({ id: genreId, page: pageId }));
      setCurrentPage(Number(pageId));
    }
  }, [pageId]);

  return (
    <>
      <div className="backdrop bg-stone-900 "></div>
      {/* <div className="blur "></div> */}
      <div className="blob"></div>
      <div
        className=" bg-transparent h-full overflow-x-hidden "
        onLoad={(e) => {
          e.preventDefault();
          if (scrollPos) {
            e.currentTarget.scrollTo(0, parseInt(scrollPos));
          }
        }}
        onScroll={(e) => {
          e.preventDefault();
          setScrollPos(e.currentTarget.scrollTop);
          localStorage.setItem("scroll", scrollPos);
          console.log(e.currentTarget.scrollTop);
        }}
      >
        {createPortal(<Outlet />, document.getElementById("root"))}

        <Navbar movies={movies} q={q} />
  
        <div className=" h-[600px] mx-20 ">
          <ImageSlider />
          </div>
  
    
        <div className=" h-[600px] mx-20 ">
              
        
       <SlideMovive />
        </div>

        {/* <CateogySelect
        genre={genre}
        genreId={genreId}
        handleChangeId={handleChangeId}
        setCurrentPage={setCurrentPage}
      /> */}
        {/* <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.total_results / 100}
        pageSize={PageSize}
        inputText={inputText}
        genreId={genreId}
        handleSubmit={handleSubmit}
        setInputText={setInputText}
        onPageChange={(page) => {
          handleSetPage(page);
        }}
      /> */}
        <div className=" h-[600px] border-zinc-50 border-8 mx-20 ">
          <LatestTrailer />
        </div>
      </div>
    </>
  );
};
