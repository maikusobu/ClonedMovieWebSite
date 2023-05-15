import { usePrevLocation } from "../../usePrevLocation/usePrevLocation";
export const fetcher = async (url: string) => {
  const { locationPath, setLocationPrev } = usePrevLocation();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const token = await fetch(
    `${url}/3/authentication/token/new?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }`,
    options
  );
  const response_token = await token.json();

  // .then((response) => response.json())
  // .then(
  //   (response) =>
  //     (window.location.href = `${
  //       import.meta.env.VITE_SITE_TMDB
  //     }/authenticate/${
  //       response.request_token
  //     }?redirect_to=http://localhost:5173${locationPath?.pathname}`)
  // )
  // .catch((err) => console.error(err));
};
