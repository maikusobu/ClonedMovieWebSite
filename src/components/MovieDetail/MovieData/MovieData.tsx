import { useRef, useEffect, lazy } from "react";
import { useState } from "react";
import { Navbar } from "../../HomePage/Navbar/Navbar";
import useScreen from "../../useScreen/useScreen";
import TopBillCast from "../TopBillCast/TopBillCast";
import { MovieType } from "../../../Type/MovieType";
import { useReleaseDay } from "../../../useReleaseDay/useReleaseDay";
import { Suspense } from "react";
import CircularBar from "../../CirculaBar/CircularBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { getReview } from "../../HomePage/SliceApi/SliceReview";
import { selectReview } from "../../HomePage/SliceApi/SliceReview";
import Review from "../Review/Review";
import Production from "../Production/Production";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import LoadingAnimationPage from "../../HomePage/LoadingAnimationPage/LoadingAnimationPage";
import { useLocation } from "react-router-dom";
import Recommendation from "../Recommendation/Recommendation";
const ImageColorExtractor = lazy(() => import("../../GetColor/ColorExtractor"));
let dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export interface genreType {
  id: number;
  tagline: string;
  budget: number;
  revenue: number;
  name: string;
  status: string;
}
export interface productionCompanies {
  id: number;
  name: string;
  origin_country: string;
  logo_path: string;
}
type MovieDataType = {
  data: MovieType;
  dataImage: {
    cast: (MovieType & {
      profile_path: string;
      character: string;
      popularity: number;
    })[];
  };
  q: string;
  movies: MovieType[];
};
function MovieData({ data, dataImage, q, movies }: MovieDataType) {
  const imgRef = useRef<HTMLImageElement>(null);
  const topCast = dataImage.cast.sort((a, b) => b.popularity - a.popularity);
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const reviewData = useAppSelector(selectReview);
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("");
  const [rgba, setRgba] = useState("");
  const [textColor, setTextColor] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const { width, height } = useScreen();
  const imgStyle = {
    backgroundImage: `linear-gradient(to right, ${color} 50%, transparent 90%)`,
  };

  const imgStyleMd = {
    backgroundColor: `${rgba}`,
  };
  if (data.poster_path === null) {
    throw new Error("not having data");
  }
  const bgimageStyle = {
    backgroundImage: `url(${import.meta.env.VITE_URL_IMAGE}${
      data.backdrop_path
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "left",
  };
  useEffect(() => {
    if (divRef.current) {
      window.scrollTo(0, 0);
    }
  }, [location]);
  useEffect(() => {
    dispatch(getReview({ id: data.id }));
  }, [data, dataImage]);
  console.log(textColor);
  return (
    <Suspense fallback={<LoadingAnimationPage />}>
      <div
        ref={divRef}
        className="relative"
        onClick={() => {
          if (nav === true) {
            setNav(false);
          }
        }}
      >
        <Navbar movies={movies} q={q} />
        <ImageColorExtractor
          rgba={rgba}
          setRgba={(rgba) => setRgba(rgba)}
          color={color}
          setColor={(color) => setColor(color)}
          textColor={textColor}
          setTextColor={(textColor) => setTextColor(textColor)}
          imageUrl={`https://image.tmdb.org/t/p/w300${
            data.backdrop_path ? data.backdrop_path : data.poster_path
          }`}
        >
          <div className="md:hidden">
            <div className=" aspect-[3/2]" style={bgimageStyle}>
              <div
                className="  flex  h-full w-1/2 items-center"
                style={imgStyle}
              >
                <div className="w-2/3">
                  <img
                    src={`${import.meta.env.VITE_URL_IMAGE}${data.poster_path}`}
                    ref={imgRef}
                    className="w-full rounded-xl"
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              </div>
            </div>

            <div className="px-4">
              <div className="text-center">
                <h1 className=" text-3xl font-extrabold text-inherit">
                  {data.title}
                </h1>
              </div>
              <div className="my-2 flex justify-center">
                <div className=" aspect-auto w-[15%] rounded-full bg-black">
                  <CircularBar vote={data?.vote_average} />
                </div>
              </div>
              <div className="flex flex-col items-center ">
                <div className=" font-medium text-inherit">
                  {data.release_date}
                </div>
                <div className=" my-2 grid w-full  grid-cols-[repeat(auto-fill,minmax(180px,1fr))] items-center justify-center gap-2 font-mono">
                  {data.genres.map((genre) => (
                    <div key={genre.id}>
                      <div className=" text-center">{genre.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className=" text-xl font-medium italic  text-inherit">
                "{data.tagline}"
              </div>
              <div className="prose prose-stone flex gap-5 text-lg text-inherit">
                <div className="font-mono">Tình trạng:</div>
                <div className="font-mono italic text-inherit">
                  {data.status}
                </div>
              </div>
              <div className=" text-inherit md:max-w-[100%]">
                <h3 className="text-2xl font-bold md:text-4xl">Overview</h3>
                <p className=" max-w-prose font-serif text-xl leading-relaxed  md:text-2xl">
                  {data.overview}
                </p>
              </div>
            </div>
            <div className="  px-4 py-4">
              <div className="flex justify-between ">
                <div className="text-inherit">
                  <h3 className="font-bold text-inherit">Budget</h3>
                  {data.budget !== 0 ? dollarUS.format(data.budget) : "Unknown"}
                </div>
                <div className="text-inherit ">
                  <h3 className="font-bold text-inherit">Revenue</h3>
                  {data.revenue !== 0
                    ? dollarUS.format(data.revenue)
                    : "Unknown"}
                </div>
              </div>
            </div>
          </div>
          <div className=" hidden md:block">
            <div className=" h-bg " style={bgimageStyle}>
              <div
                className=" flex h-full w-full  gap-2 md:p-3 lg:py-20"
                style={imgStyleMd}
              >
                <div
                  className={`${
                    width > 980 ? "w-1/4" : width > 850 ? "w-1/3" : "w-1/2"
                  }  `}
                >
                  <img
                    src={`${import.meta.env.VITE_URL_IMAGE}${data.poster_path}`}
                    ref={imgRef}
                    width={250}
                    className="h-full w-auto rounded-xl"
                  />
                </div>
                <div className=" h-full">
                  <div className=" h-full">
                    <div className="space-y-5 px-4">
                      <div className="">
                        <h1 className=" font-extrabold text-inherit md:text-2xl lg:text-5xl">
                          {data.title}
                        </h1>
                        <div className=" my-2 grid w-full grid-cols-[repeat(auto-fit,minmax(80px,100px))] items-center font-medium">
                          {data.genres.map((genre) => (
                            <div key={genre.id}>
                              <div className=" pl-2 text-left">
                                {genre.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="my-2 flex gap-5">
                        <div className=" aspect-square w-[6%] cursor-pointer self-center rounded-full bg-black p-1 ">
                          <CircularBar vote={data?.vote_average} />
                        </div>
                        <div className="  font-medium text-inherit">
                          <div>{useReleaseDay(data)}</div>
                          <div className=" cursor-pointer space-x-2">
                            <FontAwesomeIcon icon={faPlay} className="" />
                            <span
                              className={`${
                                textColor === "white"
                                  ? "hover:text-rose-600"
                                  : "hover:text-amber-500"
                              }  `}
                            >
                              Play trailer
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className=" text-xl font-medium italic  text-inherit">
                        "{data.tagline}"
                      </div>

                      <div className=" text-inherit md:max-w-[100%]">
                        <h3 className="text-2xl font-bold md:text-4xl">
                          Overview
                        </h3>
                        <p className=" max-w-prose text-ellipsis font-serif text-xl leading-relaxed md:text-xl  ">
                          {data.overview}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ImageColorExtractor>
        {imageLoaded && (
          <div
            className={`relative flex  border border-t-0  border-r-0 border-l-0 border-b-8 border-white from-orange-50/60 transition
           duration-500 before:absolute before:inset-0 before:z-10
            before:h-full before:w-[20px] before:rounded-r-lg before:bg-gradient-to-r  before:opacity-50 
            `}
          >
            <Review reviewData={reviewData} />
            <div className={`relative z-10  bg-white p-3 `}>
              <div className=" flex flex-col text-lg text-inherit">
                <h3 className=" font-bold">Status:</h3>
                <div className="font-mono italic text-inherit">
                  {data.status}
                </div>
              </div>
              <div className=" inline">
                <div className=" flex flex-col">
                  <div className="text-inherit">
                    <h3 className="font-bold text-inherit">Budget:</h3>
                    {data.budget !== 0
                      ? dollarUS.format(data.budget)
                      : "Unknown"}
                  </div>
                  <div className="text-inherit ">
                    <h3 className="font-bold text-inherit">Revenue:</h3>
                    {data.revenue !== 0
                      ? dollarUS.format(data.revenue)
                      : "Unknown"}
                  </div>
                </div>
              </div>
              <div className="text-inherit">
                <h3 className="font-bold text-inherit">Production:</h3>
                <Production
                  array={data.production_companies as productionCompanies[]}
                />
              </div>
              <div>
                <h3 className="font-bold">HomePage:</h3>
                <div className="pl-4">
                  <a href={data.homepage} target="_blank" className="">
                    <FontAwesomeIcon icon={faLink} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {imageLoaded && <TopBillCast topCast={topCast} />}
        {imageLoaded && <Recommendation id={data.id} />}
      </div>
    </Suspense>
  );
}

export default MovieData;
