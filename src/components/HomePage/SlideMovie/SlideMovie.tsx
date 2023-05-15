import { useSelector } from "react-redux";
import "./SlideMovie.css";
import { useDispatch } from "react-redux";
import { toggleState } from "../SliceApi/SliceApiTrending";

import { toggleTrending } from "../SliceApi/SliceApiTrending";

import { ListSlidingMovie } from "../ListSlidingMovie/ListSlidingMovie";

export function SlideMovive() {
  const dispatch = useDispatch();
  const toggleStateData = useSelector(toggleState);
  const options = [
    {
      value: "TODAY",
      label: "TODAY",
    },
    {
      value: "THIS WEEK",
      label: "THIS WEEK",
    },
  ];
  return (
    <div id="movie_slide" className=" height mb-20 ">
      <div className="media_mobile_container_button my-10 flex items-center gap-20 text-white">
        <div className="media_heading_mobile_container">
          <h1
            className="media_heading_mobile relative inline-block text-2xl font-semibold text-[#1D1E21]  
        before:absolute before:-inset-3 before:z-[-1] before:block before:-skew-y-6 before:bg-[#FCD354]
        "
          >
            TRENDING
          </h1>
        </div>
        <button
          type="button"
          className=" chose_button h-1/6 items-center  px-10  text-white "
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggleTrending(!toggleStateData));
          }}
        >
          <div className="  flex   rounded-full  bg-gray-500">
            <div
              className={
                "p-2 " +
                (toggleStateData
                  ? "self-start rounded-2xl bg-[#1D1E21]"
                  : "self-start")
              }
            >
              <div
                className={toggleStateData ? "fagradient" : "text-[#1D1E21]"}
              >
                TODAY
              </div>
            </div>
            <div
              className={
                "p-2 " +
                (!toggleStateData
                  ? "self-start  rounded-2xl  bg-[#1D1E21]"
                  : "self-start")
              }
            >
              <div
                className={!toggleStateData ? "fagradient" : "text-[#1D1E21]"}
              >
                THIS WEEK
              </div>
            </div>
          </div>
        </button>
        <select
          id="selectTrending"
          className="chose_select ipad:hidden"
          defaultValue={options[0].value}
          onChange={(e) => {
            e.preventDefault();
            dispatch(toggleTrending(!toggleStateData));
          }}
        >
          <option value="TODAY">TODAY</option>
          <option value="THIS WEEK">THIS WEEK</option>
        </select>
      </div>
      <ListSlidingMovie />
    </div>
  );
}
