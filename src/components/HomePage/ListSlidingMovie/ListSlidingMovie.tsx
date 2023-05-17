import { useEffect, FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { toggleState, trendingData } from "../SliceApi/SliceApiTrending";
import { trendingStatus } from "../SliceApi/SliceApiTrending";
import { Link } from "react-router-dom";
import { getTrendingMovie } from "../SliceApi/SliceApiTrending";
import { MovieType } from "../../../Type/MovieType";
import { memo } from "react";
import { useReleaseDay } from "../../../useReleaseDay/useReleaseDay";
import CircularBar from "../../CirculaBar/CircularBar";
let movies: MovieType[] = [];
const dummy = new Array(20).fill(undefined);
export const ListSlidingMovie: FunctionComponent<{}> = memo(
  function ListSlidingMovie() {
    const dispatch = useAppDispatch();
    const toggleStateData = useAppSelector(toggleState);
    const data = useAppSelector(trendingData);
    const status = useAppSelector(trendingStatus);
    if (status === "success") movies = data[0].results;

    useEffect(() => {
      const time: string = toggleStateData ? "day" : "week";
      dispatch(getTrendingMovie(time));
    }, [toggleStateData]);
    if (status == "pending") {
      return (
        <div
          id="list_content"
          className="  flex h-3/4 flex-nowrap gap-4 overflow-y-hidden 
      overflow-x-scroll rounded-[10px] border-[10px]  border-[rgb(133,_137,_148)] px-4 pt-4 "
        >
          {dummy.map((dummy, i) => (
            <div className="  basis-200 shrink-0 grow-0 " key={i}>
              <div className="mb-2  h-[300px]  w-[200px] animate-pulse rounded-lg bg-slate-700 "></div>
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
          className="  flex h-3/4 flex-nowrap
      gap-4 overflow-y-hidden overflow-x-scroll rounded-[10px] border-[10px] border-[rgb(133,_137,_148)] px-4 pt-4 "
        >
          {movies.map((movie) => {
            return (
              <div key={movie.id} className="basis-200 block shrink-0 grow-0">
                <Link className={""} to={`/description/movie/${movie.id}`}>
                  <img
                    loading="lazy"
                    className="rounded-lg"
                    src={`${import.meta.env.VITE_URL_IMAGE}original${
                      movie.poster_path
                    }`}
                    width="200"
                    height="300"
                  />
                </Link>
                <div className="   w-[200px] text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h1 className="max-w-[26ch] text-lg font-bold">
                        {movie.title}
                      </h1>
                      <div className="text-white">
                        {`${useReleaseDay(movie)} 
                    `}
                      </div>
                    </div>
                    <div className="aspect-square h-[40px] w-[40px] self-start rounded-full bg-black p-1">
                      <CircularBar vote={movie?.vote_average} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div>Error</div>;
    }
  }
);
