import { useLoaderData, useNavigate } from "react-router-dom";
import { getTheMovie } from "../HomePage/Navbar/Helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import MovieSearch from "./MovieSearch";
export const loader = async ({ params }) => {
  const { keyId } = params;

  const movies = await getTheMovie(keyId);

  return {
    movies,
  };
};
function SearchResults() {
  const { movies } = useLoaderData();
  const navigate = useNavigate();
  return (
    <>
      <div
        className=" absolute z-[-50]  h-auto min-h-full w-full bg-slate-900"
        id="child"
      ></div>
      <div className="blob"></div>
      <div className="flex items-center justify-between p-4">
        <h1 className="text-white sm:text-lg">Results search based on name</h1>
        <FontAwesomeIcon
          icon={faArrowRotateLeft}
          size="lg"
          style={{ color: "#FCD354" }}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div>
        <div className="space-y-8 p-[40px]  text-white  sm:grid-cols-[repeat(auto-fill,minmax(60px,1fr))] md:grid md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]    md:justify-between md:gap-4 md:space-y-0 md:p-4">
          {movies.map((movie, i) => (
            <MovieSearch movie={movie} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchResults;
