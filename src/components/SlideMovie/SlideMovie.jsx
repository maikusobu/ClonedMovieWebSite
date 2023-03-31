import { useSelector } from "react-redux";
import "./SlideMovie.css";
import { useDispatch } from "react-redux";
import { toggleState } from "../SliceApi/SliceApiTrending";
import { useEffect, useState } from "react";
import { toggleTrending } from "../SliceApi/SliceApiTrending";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { ListSlidingMovie } from "../ListSlidingMovie/ListSlidingMovie";
export function SlideMovive() {
  const dispatch = useDispatch();
  const toggleStateData = useSelector(toggleState);

  return (
    <div id="movie_slide" className=" height mb-20 ">
      <div className="flex text-white items-center my-10">
        <h1 className="before:block before:absolute before:-inset-3 text-2xl font-semibold  
        before:-skew-y-6 before:bg-[#FCD354] relative inline-block before:z-[-1] text-[#1D1E21]
        ">
          TRENDING
        </h1>
      <button
        type="button"
        className="  text-white px-10  items-center  h-1/6"
        onClick={(e) => {
          e.preventDefault();
          dispatch(toggleTrending(!toggleStateData));
        }}
      >
        <div className="flex bg-gray-500 rounded-full  ">
          <div
            className={
              "p-2 " + (toggleStateData ? "bg-[#1D1E21] rounded-full " : "")
            }
            >
            <div className={toggleStateData ? "fagradient" : "text-[#1D1E21]"}>
                TODAY
                </div>
          </div>
          <div
            className={
              "p-2 " + (!toggleStateData ? "bg-[#1D1E21] rounded-full " : "")
            }
          >
           <div className={!toggleStateData ? "fagradient" : "text-[#1D1E21]"}>
               THIS WEEK
                </div>
          </div>
        </div>
      </button>
      </div>
        <ListSlidingMovie />
    </div>
  );
}
