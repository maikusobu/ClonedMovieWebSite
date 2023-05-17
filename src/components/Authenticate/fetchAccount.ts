import { da } from "date-fns/locale";

export const fetchAccount = async (id: string) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
  };
  const data_response = await fetch(
    `${import.meta.env.VITE_SITE_API_TMDB}/3/account/${
      import.meta.env.VITE_ACCOUNT_ID
    }?session_id=${id}`,
    options
  );
  const dataJson = await data_response.json();
  return dataJson;
};
