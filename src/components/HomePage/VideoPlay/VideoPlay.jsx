import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { getTrailer } from "../SliceApi/SliceApiLatest";
import { useLoaderData } from "react-router-dom";
import { FaAsterisk } from "react-icons/fa";
import { useNavigation } from "react-router-dom";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
const apikey = "d438f2f8ef299fb8e091eed12ef4c422";
export async function loader({ params }) {
  const data = await fetch(`
  https://api.themoviedb.org/3/movie/${params.movieID}/videos?api_key=${apikey}&language=en-US`);
  return data.json();
}

export function VideoPlay() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useLoaderData();

  return (
    <div id="video_popup" className=" aspect-video">
      <button
        type="button"
        onClick={() => {
          navigate("/");
        }}
      >
        <IconContext.Provider
          value={{ className: "", size: "1.5em", color: "white" }}
        >
          <FaAsterisk />
        </IconContext.Provider>
      </button>
      <div className="flex h-full w-full items-center justify-center">
        <iframe
          width="1000"
          height="500"
          src={`https://www.youtube.com/embed/${data.results[1]?.key}`}
          title="Video clip"
          frameBorder="2"
          className="  mx-auto h-[50%] w-[80%] border-8 md:h-[80%]"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  );
}
