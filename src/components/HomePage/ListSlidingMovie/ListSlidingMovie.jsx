import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toggleState, trendingData } from "../SliceApi/SliceApiTrending";
import { trendingStatus } from "../SliceApi/SliceApiTrending";
import { Link } from "react-router-dom";
import { getTrendingMovie } from "../SliceApi/SliceApiTrending";
import { useDispatch } from "react-redux";
import { memo } from "react";
import { useReleaseDay } from "../../../useReleaseDay/useReleaseDay";

import "./style.css";

const dummy = new Array(20).fill(undefined);
export const ListSlidingMovie = memo(function ListSlidingMovie({ toggle }) {
  const dispatch = useDispatch();
  const toggleStateData = useSelector(toggleState);
  const data = useSelector(trendingData);
  const status = useSelector(trendingStatus);
  useEffect(() => {
    const time = toggleStateData ? "day" : "week";
    dispatch(getTrendingMovie(time));
  }, [toggleStateData]);
  if (status == "pending") {
    return (
      <div
        id="list_content"
        className="  flex h-3/4 flex-nowrap gap-10 
      overflow-y-hidden overflow-x-scroll rounded-[10px]  border border-[10px] border-[rgb(133,_137,_148)] p-10"
      >
        {dummy.map((dummy, i) => (
          <div className="  basis-200 shrink-0 grow-0 " key={i}>
            <div className="mb-2  h-[300px]  w-[200px] animate-pulse rounded-lg bg-slate-700 ">
              {/* <div className=" bg-slate-700 listMovie"></div> */}
              {/* <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div> */}
            </div>
            <div className="h-[50px] w-[200px] ">
              <h1 className="mb-2 h-1/2  w-full animate-pulse rounded-lg bg-slate-700 "></h1>
              <div className="h-1/2 w-full animate-pulse   rounded-lg bg-slate-700 ">
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (status == "success") {
    return (
      <div
        id="list_content"
        className="  flex h-3/4 flex-nowrap gap-10 
      overflow-y-hidden overflow-x-scroll rounded-[10px]  border border-[10px] border-[rgb(133,_137,_148)] p-10"
      >
        {data[0].results.map((movie) => {
          return (
            <div key={movie.id} className="basis-200 shrink-0 grow-0 ">
              <Link className={""} to={`/description/movie/${movie.id}`}>
                <img
                  loading="lazy"
                  className="rounded-lg"
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  width="200"
                  height="300"
                />
              </Link>
              <div className=" max-sm-prose  w-[200px] text-white">
                <h1>{movie.title}</h1>
                <div className="flex gap-5">
                  <div>{Math.round(movie.vote_average)}</div>
                  <div className="text-white">
                    {`${useReleaseDay(movie)[2]} ${useReleaseDay(movie)[1]} ${
                      useReleaseDay(movie)[3]
                    }`}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
});