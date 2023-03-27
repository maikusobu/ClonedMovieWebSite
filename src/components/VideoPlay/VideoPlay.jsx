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
    <div id="video_popup" className="">
                   
                   
               
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

      <iframe
        width="1000"
        height="500"
        src={`https://www.youtube.com/embed/${data.results[2]?.key}`}
        title="Video clip"
        frameborder="2"
        className="border-8 mx-auto w-[80%] h-[80%]  text"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        allowfullscreen="true"
      ></iframe>
    </div>
  );
}
