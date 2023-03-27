import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toggleState, trendingData } from "../SliceApi/SliceApiTrending";
import { trendingStatus } from "../SliceApi/SliceApiTrending";
import { Link } from "react-router-dom";
import { getTrendingMovie } from "../SliceApi/SliceApiTrending";
import { useDispatch } from "react-redux";
import { memo } from "react";
import ReactLoading from "react-loading";
import { loader } from "../Layout/Layout";

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
      <div className=" h-2/3  left-1/2">
        <ReactLoading
          type="spin"
          height={"10%"}
          width={"10%"}
          color="#fff"
          className="  "
        />
      </div>
    );
  } else if (status == "success") {
    return (
      <div className=" h-2/3 flex flex-nowrap overflow-x-scroll gap-10 px-10  ">
        {data[0].results.map((movie) => {
          return (
            <div key={movie.title} className="grow-0 shrink-0 basis-200 ">
              {/* <Link className={load ? "block" : "hidden"}>
                <ReactLoading
                  type="bubbles"
                  width={"2%"}
                  height={"2%"}
                  color="#fff"
                ></ReactLoading>
              </Link> */}
              <Link className={""}>
                <img
                  loading="lazy"
                  className=""
                  onLoad={() => setLoad(false)}
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  width="200"
                  height="300"
                />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
});
