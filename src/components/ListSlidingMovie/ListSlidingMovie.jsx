import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toggleState, trendingData } from "../SliceApi/SliceApiTrending";
import { trendingStatus } from "../SliceApi/SliceApiTrending";
import { Link } from "react-router-dom";
import { getTrendingMovie } from "../SliceApi/SliceApiTrending";
import { useDispatch } from "react-redux";
import { memo } from "react";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import './style.css';

const dummy = [1,2,3,4,5,6,7,8,9,10];
export const ListSlidingMovie = memo(function ListSlidingMovie({ toggle }) {
  const dispatch = useDispatch();
  const toggleStateData = useSelector(toggleState);
  const data = useSelector(trendingData);
  const status = useSelector(trendingStatus);
  useEffect(() => {
    const time = toggleStateData ? "day" : "week";
    dispatch(getTrendingMovie(time));
  }, [toggleStateData]);

  const [load, setLoad] = useState(true);
  if (status == "pending") {
    return (
      <div className=" h-2/3  flex animate-pulse flex-nowrap overflow-x-scroll gap-10 px-10  ">
      {dummy.map(dummy =>  
      <div className=" listMovie border border-blue-300   bg-slate-700 shadow rounded-md p-4 shrink-0 grow-0 ">
      <div className="animate-pulse  bg-slate-700  ">
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
    </div>)}
   </div>
    );
  } else if (status == "success") {
  
    return (
        
         <div className=" data-simplebar h-2/3 flex flex-nowrap overflow-x-scroll 
      gap-10 p-10 overflow-y-hidden border-3 border-white border  rounded-xl">
       
        {data[0].results.map((movie) => {
          return (
            <div key={movie.title} className="grow-0 shrink-0 basis-200 ">
          
              <Link className={""}>
                <img
                  loading="lazy"
                  className="rounded-lg"
                  onLoad={() => setLoad(false)}
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  width="200"
                  height="300"
                />
              </Link>
              <div> 
                  <h1>
                  {movie.title}
                  </h1>
              </div>
            </div>
          );
        })}

      </div>
    
    );
   
   
  }
});
