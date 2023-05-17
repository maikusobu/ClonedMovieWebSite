import { useLoaderData, useNavigate } from "react-router-dom";
import { getTheMovie } from "../HomePage/Navbar/Helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import MovieSearch from "./MovieSearch";
import { LoaderData } from "../../Type/loaderType";
import { usePrevLocation } from "../../usePrevLocation/usePrevLocation";
import LoadingBarTop from "../LoadingBarTop/LoadingBarTop";
export const loader = async ({ params }: { params: any }) => {
  const { keyId } = params;

  const movies = await getTheMovie(keyId);

  return {
    movies,
    keyId,
  };
};
function SearchResults() {
  const { movies, keyId } = useLoaderData() as LoaderData<typeof loader>;
  const navigate = useNavigate();
  const { locationPath, setLocationPrev } = usePrevLocation();
  return (
    <>
      <LoadingBarTop />
      <div
        className=" absolute z-[-50]  h-auto min-h-full w-full bg-slate-900"
        id="child"
      ></div>
      <div className="blob"></div>
      <div className="flex items-center justify-between p-4">
        <div>
          <h1 className="font-bold text-white sm:text-lg">Search results</h1>
        </div>
        <div className="cursor-pointer text-base text-yellow md:text-xl">
          <FontAwesomeIcon
            icon={faArrowRotateLeft}
            size="lg"
            onClick={() => {
              navigate(`${locationPath?.pathname}`);
            }}
          />
        </div>
      </div>
      <div>
        <div className="space-y-8 p-[40px]  text-white  sm:grid-cols-[repeat(auto-fill,minmax(60px,1fr))] md:grid md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]    md:justify-between md:gap-4 md:space-y-0 md:p-4">
          {movies?.map((movie, i) => (
            <MovieSearch movie={movie} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchResults;
