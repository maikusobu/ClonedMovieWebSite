import { useSelector } from "react-redux";
import "./SlideMovie.css";
import { useDispatch } from "react-redux";
import { toggleState } from "../SliceApi/SliceApiTrending";
import { useEffect, useState } from "react";
import { toggleTrending } from "../SliceApi/SliceApiTrending";

import { ListSlidingMovie } from "../ListSlidingMovie/ListSlidingMovie";
export function SlideMovive() {
  const dispatch = useDispatch();
  const toggleStateData = useSelector(toggleState);

  return (
    <div id="movie_slide" className="py-10 height mb-20 ">
      <button
        type="button"
        className=" flex text-white px-10 pt-2 gap-10 items-center  h-1/3"
        onClick={(e) => {
          e.preventDefault();
          dispatch(toggleTrending(!toggleStateData));
        }}
      >
        <h1 className="py-10">TRENDING</h1>
        <div className="flex bg-red-500 rounded-full  ">
          <div
            className={
              "p-2 " + (toggleStateData ? "bg-green-500 rounded-full " : "")
            }
          >
            TODAY
          </div>
          <div
            className={
              "p-2 " + (!toggleStateData ? "bg-green-500 rounded-full " : "")
            }
          >
            THIS WEEK
          </div>
        </div>
      </button>

      <ListSlidingMovie />
    </div>
  );
}
