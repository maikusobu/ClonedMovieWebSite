import { Navbar } from "../HomePage/Navbar/Navbar";
import { api_key } from "../../apikey";
import MovieData from "./MovieData/MovieData";
import { useLoaderData } from "react-router-dom";
import { getTheMovie } from "../HomePage/Navbar/Helper";
export const loader = async ({ params, request }) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${params.movieID}?api_key=${api_key}&language=vi-VN`,
    {
      method: "GET",
      credentials: "omit",
    }
  );
  const dataImage = await fetch(
    `https://api.themoviedb.org/3/movie/${params.movieID}/credits?api_key=${api_key}&language=vi-VN`,
    {
      method: "GET",
      credentials: "omit",
    }
  );
  const url = new URL(request.url);
  const q = url.searchParams.get("search");

  const movies = await getTheMovie(q);
  const dataJSON = await data.json();
  const dataImageJSON = await dataImage.json();
  return { dataJSON, dataImageJSON, movies, q };
};
function MovieDescription() {
  const data = useLoaderData();
  console.log(data);

  return (
    <div className="  overflow-x-hidden bg-slate-900">
      <MovieData data={data.dataJSON} dataImage={data.dataImageJSON} />
    </div>
  );
}

export default MovieDescription;
