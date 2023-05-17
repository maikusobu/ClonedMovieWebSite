import { useRef, useEffect, lazy } from "react";
import { useState } from "react";
import { Navbar } from "../../HomePage/Navbar/Navbar";
import useScreen from "../../useScreen/useScreen";
import TopBillCast from "../TopBillCast/TopBillCast";
import { MovieType } from "../../../Type/MovieType";
import { useReleaseDay } from "../../../useReleaseDay/useReleaseDay";
import { Suspense } from "react";
import { Form } from "react-router-dom";
import CircularBar from "../../CirculaBar/CircularBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPen } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { getReview } from "../../HomePage/SliceApi/SliceReview";
import { selectReview } from "../../HomePage/SliceApi/SliceReview";
import Review from "../Review/Review";
import { createPortal } from "react-dom";
import Production from "../Production/Production";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import LoadingBarTop from "../../LoadingBarTop/LoadingBarTop";
import { useLocation } from "react-router-dom";
import Recommendation from "../Recommendation/Recommendation";
import ReviewTabletandMobile from "../Review/ReviewTabletandMobile";
const ImageColorExtractor = lazy(() => import("../../GetColor/ColorExtractor"));
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../LoadingPage/LoadingPage";

// import { postRate } from "../Helper/postRate";
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
// export const action = async ({ request }: { request: Request }) => {
//   let formData = await request.formData();
//   let rateValue = formData.get("rateValue");
//   let id = formData.get("id");
//   console.log(rateValue, id);
//   if (typeof rateValue === "string" && typeof id === "string") {
//     postRate(rateValue, id);
//   }
// };

function MovieData({ data, dataImage, q, movies }: MovieDataType) {
  const imgRef = useRef<HTMLImageElement>(null);
  const topCast = dataImage.cast.sort((a, b) => b.popularity - a.popularity);
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const reviewData = useAppSelector(selectReview);
  const [nav, setNav] = useState(false);
  const [valueRate, setValueRate] = useState<string>("");
  const [rate, setRate] = useState(false);
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
    backgroundImage: `url(${import.meta.env.VITE_URL_IMAGE}original${
      data.backdrop_path
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "left",
  };
  const handleChangeRate = (value: string) => {
    if (isNaN(Number(value))) {
      alert("value should not be string");
    } else {
      if (0 <= Number(value) && Number(value) <= 10) setValueRate(value);
      else {
        alert("value should range from 0 to 10");
      }
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView();
    }
  }, [location]);
  useEffect(() => {
    dispatch(getReview({ id: data.id }));
  }, [data, dataImage]);

  return (
    <Suspense fallback={<LoadingPage />}>
      <LoadingBarTop />
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
          imageUrl={`${import.meta.env.VITE_URL_IMAGE}w300${
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
                    src={`${import.meta.env.VITE_URL_IMAGE}original${
                      data.poster_path
                    }`}
                    ref={imgRef}
                    className="w-full rounded-xl"
                    onLoad={() => {
                      setImageLoaded(true);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 px-4">
              <div className="text-center">
                <h1 className=" text-3xl font-extrabold text-inherit">
                  {data.title}
                </h1>
              </div>
              <div className="my-2 flex justify-center">
                <div
                  className={` aspect-auto ${
                    width > 500 ? "w-[8%]" : "w-[15%]"
                  } rounded-full bg-black`}
                >
                  <CircularBar vote={data?.vote_average} />
                </div>
              </div>
              <div className="flex flex-col items-center ">
                <div className=" font-medium text-inherit">
                  {useReleaseDay(data)}
                </div>
                <div className=" my-2 grid w-full  grid-cols-[repeat(auto-fill,minmax(80px,1fr))] items-center justify-center gap-2 font-mono">
                  {data.genres.map((genre) => (
                    <div key={genre.id}>
                      <div className=" text-center">{genre.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex gap-4">
                  <h3 className="font-bold text-inherit underline">Status:</h3>
                  <div className="inline">{data.status}</div>
                </div>
              </div>
              <div
                className="flex items-center gap-3"
                onClick={() => {
                  navigate(`play/movie/${data.id}`);
                }}
              >
                <div>
                  <FontAwesomeIcon icon={faPlay} className="" />
                </div>
                <div className="underline">Watch Trailer</div>
              </div>
              <div className=" text-base font-medium italic  text-inherit">
                {`${data.tagline ? `"${data.tagline}"` : ""}`}
              </div>

              <div className=" text-inherit md:max-w-[100%]">
                <h3 className="text-2xl font-bold md:text-4xl">Overview</h3>
                <p className=" max-w-prose font-serif text-xl leading-relaxed  md:text-2xl">
                  {data.overview}
                </p>
              </div>
            </div>
            <div className="px-4">
              <div className="space-y-2">
                <div className="text-inherit">
                  <h3 className="font-bold text-inherit underline">
                    Production:
                  </h3>
                  {data.production_companies
                    .filter((company) => company.origin_country === "US")
                    .map((company) => (
                      <div key={company.id} className="">
                        {company.name}{" "}
                      </div>
                    ))}
                </div>
                <div>
                  <h3 className="font-bold underline">HomePage:</h3>
                  <div className="">
                    <a
                      href={data.homepage}
                      target="_blank"
                      className="underline"
                    >
                      <span>{data.homepage}</span>
                    </a>
                  </div>
                </div>
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
                className=" lg:py-15  flex h-full  w-full gap-2 md:p-2 lg:px-6"
                style={imgStyleMd}
              >
                <div className={`${width > 800 ? "w-1/3" : "w-1/2"}`}>
                  <img
                    src={`${import.meta.env.VITE_URL_IMAGE}original${
                      data.poster_path
                    }`}
                    ref={imgRef}
                    width={250}
                    className="h-3/4 w-auto rounded-xl"
                    onLoad={() => {
                      setImageLoaded(true);
                    }}
                  />
                </div>
                <div className=" h-full">
                  <div className=" h-full">
                    <div className=" space-y-2 px-4  lg:space-y-5">
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
                        <div className=" aspect-square w-[8%] cursor-pointer self-center rounded-full bg-black p-1 lg:w-[6%] ">
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
                              onClick={() => {
                                navigate(`play/movie/${data.id}`);
                              }}
                            >
                              Play trailer
                            </span>
                          </div>
                        </div>
                        {/* <div>
                          <div>
                            <h3
                              className=" flex cursor-pointer font-semibold text-inherit hover:underline"
                              onClick={() => {
                                setRate(!rate);
                              }}
                            >
                              Rate this movie
                            </h3>
                          </div>
                          {!rate && (
                            <div>
                              <FontAwesomeIcon icon={faPen} />
                            </div>
                          )}
                          {rate && (
                            <Form
                              className="absolute flex h-[35px] w-[150px] "
                              method="post"
                              action={`/description/movie/${data.id}`}
                            >
                              <input
                                type="text"
                                placeholder="Rate"
                                className="w-full rounded-full pr-10 text-black "
                                onChange={(e) =>
                                  handleChangeRate(e.currentTarget.value)
                                }
                                value={valueRate}
                                name="rateValue"
                              ></input>
                              <input
                                type="hidden"
                                value={`${data.id}`}
                                name="id"
                              />
                              <button
                                type="submit"
                                className=" relative h-full w-[80px] translate-x-[-100%]  rounded-r-full  border-black text-black before:absolute before:top-0 before:left-0 before:h-full before:w-[2px] before:bg-black hover:bg-slate-700/80 hover:text-white "
                              >
                                Rate
                              </button>
                            </Form>
                          )}
                        </div> */}
                      </div>

                      <div className=" text-xl font-medium italic  text-inherit">
                        {`${data.tagline ? `"${data.tagline}"` : ""}`}
                      </div>

                      <div className=" text-inherit md:max-w-[100%]">
                        <h3 className="text-2xl font-bold md:text-4xl">
                          Overview
                        </h3>
                        <p className=" max-w-prose text-ellipsis font-serif text-xl leading-relaxed md:text-xl xl:text-2xl ">
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
            className={`relative flex overflow-hidden  border border-t-0  border-r-0 border-l-0 border-b-8 border-white from-orange-50/60 transition
           duration-500 before:absolute before:inset-0 before:z-10
            before:h-full before:w-[20px] before:rounded-r-lg before:bg-gradient-to-r  before:opacity-50 
            `}
          >
            {width >= 950 && <Review reviewData={reviewData} />}
            {width < 950 && <ReviewTabletandMobile reviewData={reviewData} />}
            {width > 770 && (
              <div className={` relative z-10  w-1/5 bg-white p-3 lg:w-[14%]`}>
                <div className=" flex flex-col text-lg text-inherit">
                  <h3 className=" font-bold">Status:</h3>
                  <div className="font-mono italic text-inherit">
                    {data.status}
                  </div>
                </div>
                <div className=" inline">
                  <div className=" flex flex-col">
                    <div className="hidden text-inherit md:block">
                      <h3 className=" font-bold text-inherit">Budget:</h3>
                      <span>
                        {data.budget !== 0
                          ? dollarUS.format(data.budget)
                          : "Unknown"}
                      </span>
                    </div>
                    <div className="hidden text-inherit md:block">
                      <h3 className="font-bold text-inherit">Revenue:</h3>
                      <span>
                        {data.revenue !== 0
                          ? dollarUS.format(data.revenue)
                          : "Unknown"}
                      </span>
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
            )}
          </div>
        )}

        {imageLoaded && <TopBillCast topCast={topCast} />}
        {imageLoaded && <Recommendation id={data.id} />}
        {createPortal(
          <Outlet />,
          document.getElementById("root") as HTMLElement
        )}
      </div>
    </Suspense>
  );
}

export default MovieData;
