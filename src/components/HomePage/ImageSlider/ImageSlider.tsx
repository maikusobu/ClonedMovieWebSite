import { useEffect, useState, useRef } from "react";
import { IconContext} from "react-icons";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ImageSlider.css";
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useReleaseDay } from "../../../useReleaseDay/useReleaseDay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MovieType } from "../../../Type/MovieType";
type ImageSliderType = {
  dataToprated: MovieType[],
  isLoading: boolean,
}
export function ImageSlider({ dataToprated, isLoading } : ImageSliderType) {
  let dataDate: string = "";
  const [index, setIndex] = useState(0);
  const [num, setNum] = useState(0);
  const navigate = useNavigate();
  const imgSlide = useRef<ReturnType<typeof setInterval> | null>(null);
  const handleChange = (index : number) => {
    setIndex(index);
    setNum(index);
  };

  useEffect(() => {
    imgSlide.current = setInterval(() => {
      setNum((prev) => {
        if (prev === dataToprated.slice(0, 5).length - 1) return 0;
        else return prev + 1;
      });
      setIndex((prev) => {
        if (prev === dataToprated.slice(0, 5).length - 1) return 0;
        else return prev + 1;
      });
    }, 4000);
    return () => {
      if (imgSlide.current !== null)
      clearInterval(imgSlide.current);
    };
  }, [num, index]);

  if (!isLoading) {
    const movie = dataToprated[index];
    dataDate = useReleaseDay(movie);
  }
  if (isLoading) return <h1 className="text-white">Loading</h1>;
  else 
    return (
      <div className=" media_width flex gap-2 px-10 pt-10 ">
        <div
          key={index}
          className="slideShow relative w-1/3 "
          data-index={index}
        >
          <div className="absolute top-0 translate-y-[-50%] translate-x-[50%]  rounded-full">
            <div className="media_circle_progress h-[30px] w-[30px] rounded-full bg-black ">
              <CircularProgressbar
                value={dataToprated[index]?.vote_average * 10 || 100}
                text={`${dataToprated[index]?.vote_average || 100}`}
                strokeWidth={12}
                styles={{
                  root: {},
                  path: {
                    stroke: `${
                      dataToprated[index]?.vote_average * 10 >= 70
                        ? "#dc2430"
                        : "#7b4397"
                    }`,
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                  },
                  trail: {
                    stroke: "#d6d6d6",
                  },
                  text: {
                    fill: " #FCD354",
                    fontSize: "40px",
                    fontWeight: "500",
                  },
              
                }}
              />
              ;
            </div>
          </div>
          <div>
            <img
              key={dataToprated[index]?.title}
              className="media_img_width aspect-[3/4] shadow-lg"
              src={`${import.meta.env.VITE_URL_IMAGE}${dataToprated[index]?.poster_path}`}
              width="250"
              alt={dataToprated[index]?.title}
            />
          </div>
          <div className=" media_dot mt-2 flex w-1/2 justify-center">
            {dataToprated.slice(0, 5).map((movie, i) => (
              <div
                key={movie.title}
                className={"dot " + (num == i ? "active" : "")}
                onClick={(e) => {
                  handleChange(i);
                }}
              ></div>
            ))}
          </div>
          <div className="media_arrow hidden ">
            <div
              onClick={(e) => {
                e.preventDefault();
                if (index > 0) {
                  setIndex((prev) => prev - 1);
                  setNum((prev) => prev - 1);
                }
              }}
              className={`${index === 0 ? "disable" : ""}`}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                size="2xl"
                style={{ color: "#7b4397" }}
              />
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();

                if (index < dataToprated.slice(0, 5).length - 1) {
                  setIndex((prev) => prev + 1);
                  setNum((prev) => prev + 1);
                }
              }}
              className={`${
                index === dataToprated.slice(0, 5).length - 1 ? "disable" : ""
              }`}
            >
              <FontAwesomeIcon
                icon={faArrowRight}
                size="2xl"
                style={{ color: "#7b4397" }}
              />
            </div>
          </div>
          <div className="icon_mobile">
            <IconContext.Provider
             
              value={{ className: "", size: "2rem", color: "#dc2430" }}
             
            >
              <FaPlayCircle
                 className="cursor-pointer"
                onClick={() => {
                  navigate(`play/movie/${dataToprated[index]?.id}`);
                }}
              />
            </IconContext.Provider>
            <div className=" text_date_mobile text-white">{`${dataDate}`}</div>
          </div>
        </div>

        <div className="media_paragraph_container w-2/3">
          <figure>
            <figcaption>
              <h1 className="media_text_heading font-bold text-[#FCD354]">
                {dataToprated[index]?.title}
              </h1>
            </figcaption>
            <p
              className=" media_text_paragraph max-w-prose pt-4  font-light text-neutral-50
  first-letter:float-left first-letter:mr-3 first-letter:text-5xl
  first-letter:font-bold first-letter:text-[#dc2430] "
            >
              {dataToprated[index]?.overview}
            </p>
            <p
              className=" media_text_paragraph_mobile hidden max-w-prose pt-4  font-light
  text-neutral-50 first-letter:float-left first-letter:mr-3
  first-letter:text-5xl first-letter:font-bold first-letter:text-[#dc2430] "
            >
              {dataToprated[index]?.overview.substring(0, 200) + "...."}
            </p>
            <div className="icon_play flex gap-4 pt-4 pb-4">
              <div
                onClick={() => {
                  navigate(`play/movie/${dataToprated[index]?.id}`);
                }}
                className=" cursor-pointer"
              >
                <IconContext.Provider
                  value={{ className: "", size: "3em", color: "#dc2430" }}
                >
                  <FaPlayCircle />
                </IconContext.Provider>
              </div>
            </div>
            <div className=" text_date text-white">{`${dataDate}`}</div>
          </figure>
        </div>
      </div>
    );
}
