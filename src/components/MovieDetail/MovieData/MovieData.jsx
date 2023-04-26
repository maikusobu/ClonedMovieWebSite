import { urlImage } from "../../../apikey";
import { useRef, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../HomePage/Navbar/Navbar";
import { extractColors } from "extract-colors";
import { CircularProgressbar } from "react-circular-progressbar";
import DropDownMovie from "../../HomePage/DropDownMovie/DropDownMovie";
import img from "./img.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import {
  faBars,
  faHouse,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import TopBillCast from "../TopBillCast/TopBillCast";
import { useLoaderData } from "react-router-dom";
import Media from "../Media/Media";
import ImageColorExtractor from "../../GetColor/ColorExtractor";

let dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
function MovieData({ data, dataImage }) {
  const imgRef = useRef();
  const canvasRef = useRef();
  const navigate = useNavigate();
  const topCast = dataImage.cast.sort((a, b) => b.popularity - a.popularity);

  const [nav, setNav] = useState(false);
  const [search, setSearch] = useState(false);
  const [color, setColor] = useState(null);
  const [rgba, setRgba] = useState(null);
  const [textColor, setTextColor] = useState(null);
  const imgStyle = {
    backgroundImage: `linear-gradient(to right, ${color} 50%, ${rgba} 90%)`,
  };
  const bgimageStyle = {
    backgroundImage: `url(${urlImage}${data.backdrop_path})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "left",
  };
  console.log(data);
  const { movies, q } = useLoaderData();
  return (
    <div
      className=""
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
        imageUrl={`https://image.tmdb.org/t/p/w300${data.backdrop_path}`}
      >
        <div className=" aspect-[3/2]" style={bgimageStyle}>
          <div className="  flex h-full w-1/2 items-center" style={imgStyle}>
            <div className="w-2/3">
              <img
                src={`${urlImage}${data.poster_path}`}
                ref={imgRef}
                className="w-full rounded-xl"
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
            <div className=" aspect-auto w-[10%]">
              <CircularProgressbar
                value={data?.vote_average * 10 || 100}
                text={`${data?.vote_average || 100}`}
                strokeWidth={12}
                styles={{
                  root: {},
                  path: {
                    stroke: "#dc2430",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                  },
                  trail: {
                    stroke: "#d6d6d6",
                  },
                  text: {
                    fill: `${textColor}`,
                    fontSize: "25px",
                    fontWeight: "500",
                  },
                  backgroundColor: "#301816",
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <div className=" font-medium text-inherit">{data.release_date}</div>
            <div className=" my-2 grid grid-cols-2 grid-rows-[repeat(autofill,_minmax(0,_1fr))] gap-2 font-mono ">
              {data.genres.map((genre) => (
                <div key={genre.id}>
                  <div>{genre.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className=" text-xl font-medium italic  text-inherit">
            "{data.tagline}"
          </div>
          <div className="prose prose-stone flex gap-5 text-lg text-inherit">
            <div className="font-mono">Tình trạng:</div>
            <div className="font-mono italic text-inherit">{data.status}</div>
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
              <h3 className="font-bold text-yellow">Budget</h3>
              {data.budget !== 0 ? dollarUS.format(data.budget) : "Unknown"}
            </div>
            <div className="text-inherit ">
              <h3 className="font-bold text-purple">Revenue</h3>
              {data.revenue !== 0 ? dollarUS.format(data.revenue) : "Unknown"}
            </div>
          </div>
        </div>
      </ImageColorExtractor>
      <TopBillCast topCast={topCast} />
      {/* <Media /> */}
    </div>
  );
}

export default MovieData;
