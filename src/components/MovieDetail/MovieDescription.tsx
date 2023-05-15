import { Navbar } from "../HomePage/Navbar/Navbar";

import MovieData from "./MovieData/MovieData";
import { useLoaderData } from "react-router-dom";
import { getTheMovie } from "../HomePage/Navbar/Helper";
import { LoaderData } from "../../Type/loaderType";
import { useEffect } from "react";
import Footer from "../HomePage/Footer/Footer";
export const loader = async ({
  params,
  request,
}: {
  params: any;
  request: any;
}) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${params.movieID}?api_key=${
      import.meta.env.VITE_TMBD_API_KEY
    }&language=en-US`,
    {
      method: "GET",
      credentials: "omit",
    }
  );
  const dataImage = await fetch(
    `https://api.themoviedb.org/3/movie/${params.movieID}/credits?api_key=${
      import.meta.env.VITE_TMBD_API_KEY
    }&language=en-US`,
    {
      method: "GET",
      credentials: "omit",
    }
  );
  const url = new URL(request.url);
  const q = url.searchParams.get("search");
  const movies = await getTheMovie(q ? q : "");
  const dataJSON = await data.json();
  const dataImageJSON = await dataImage.json();
  return { dataJSON, dataImageJSON, movies, q };
};
function MovieDescription() {
  const data = useLoaderData() as LoaderData<typeof loader>;
  useEffect(() => {}, []);
  return (
    <div className="  overflow-hidden bg-slate-900">
      <MovieData
        data={data.dataJSON}
        dataImage={data.dataImageJSON}
        q={data.q ? data.q : ""}
        movies={data.movies!}
      />
      <Footer />
    </div>
  );
}

export default MovieDescription;
