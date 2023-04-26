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
import { api_key } from "../../../apikey";
let PageSize = 20;
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("search");
  console.log(q);
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
  const [isLoading, setIsLoading] = useState(false);
  const [dataToprated, setDataToprated] = useState([]);
  const [page, setPage] = useState(1);
  const [inputText, setInputText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tick, setTick] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [num, setNum] = useState(0);
  const [index, setIndex] = useState(0);
  const statusTyp = useSelector(statusType);
  const fetchData = async () => {
    console.log("we");
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`
    );
    const dataJSON = await data.json();
    setIsLoading(false);
    setDataToprated(dataJSON.results);
    console.log(dataJSON.results);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(e.target.value);
    setInputText(!inputText);
  };
  // const handleSetPage = (page) => {
  //   setCurrentPage(page);
  //   if (statusTyp === "idle") {
  //     dispatch(getPopularMovie(pageId));
  //   } else {
  //     dispatch(getListGenre({ id: genreId, page: pageId }));
  //   }
  // };
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
    console.log("do something here");
    setIsLoading(true);
    fetchData();
    dispatch(getLatestMovie());
  }, []);

  return (
    <>
      <div className="backdrop bg-slate-900  "></div>
      <div className="blob"></div>
      <div
        className=" relative h-full overflow-x-hidden bg-transparent"
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
        }}
      >
        {createPortal(<Outlet />, document.getElementById("root"))}

        <Navbar movies={movies} q={q} />

        <div className=" media_image_container   mx-20 h-[600px] ">
          <ImageSlider dataToprated={dataToprated} isLoading={isLoading} />
        </div>

        <div className=" image_responsive mx-20 h-[600px] ">
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
        <div className=" trailer_mobile image_responsive mx-20 flex  h-[600px] flex-col gap-4">
          <LatestTrailer />
        </div>
      </div>
    </>
  );
};
