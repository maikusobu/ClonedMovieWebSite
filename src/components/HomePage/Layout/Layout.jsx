import { Navigate, Outlet } from "react-router-dom";

import "./Layout.css";
import { useRef, useState, useEffect, useMemo } from "react";

import { useDispatch } from "react-redux";

import { createPortal } from "react-dom";
import { Navbar } from "../Navbar/Navbar";

import { ImageSlider } from "../ImageSlider/ImageSlider";
import { LatestTrailer } from "../LatestTrailer/LatestTrailer";

import { SlideMovive } from "../SlideMovie/SlideMovie";

import { useLoaderData } from "react-router-dom";
import { getTheMovie } from "../Navbar/Helper";
import { getLatestMovie } from "../SliceApi/SliceApiLatest";
import { api_key } from "../../../apikey";
let PageSize = 20;
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("search");

  const movies = await getTheMovie(q);

  return { movies, q };
}
export const Layout = () => {
  let data = 0;

  const { movies, q } = useLoaderData();
  const [scrollPos, setScrollPos] = useState(localStorage.getItem("scroll"));

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [dataToprated, setDataToprated] = useState([]);

  const [inputText, setInputText] = useState("");

  const fetchData = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`
    );
    const dataJSON = await data.json();
    setIsLoading(false);
    setDataToprated(dataJSON.results);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(e.target.value);
    setInputText(!inputText);
  };
  useEffect(() => {
    setIsLoading(true);
    fetchData();
    dispatch(getLatestMovie());
    var parent = document.getElementById("root");
    var child = document.getElementById("child");
    var parentHeight = parent.offsetHeight;
    child.style.height = parentHeight + "px";
  }, []);

  return (
    <>
      <div className="backdrop bg-slate-900 " id="child"></div>

      <div className="blob"></div>
      <div
        className=" relative h-full overflow-hidden bg-transparent "
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
