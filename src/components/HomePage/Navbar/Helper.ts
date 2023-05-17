import { MovieType } from "../../../Type/MovieType";
export const getTheMovie = async (name: string) => {
  if (name) {
    try {
      const data = await fetch(
        `${import.meta.env.VITE_SITE_API_TMDB}/3/search/movie?api_key=${
          import.meta.env.VITE_TMBD_API_KEY
        }&language=en-US&query=${name}&page=1&include_adult=false`
      );
      const dataJSON = await data.json();
      return dataJSON.results as MovieType[];
    } catch (e) {
      throw e;
    }
  }
};
