import { da } from "date-fns/locale";

export const fetchAccount = async (id: string) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDM4ZjJmOGVmMjk5ZmI4ZTA5MWVlZDEyZWY0YzQyMiIsInN1YiI6IjYzOGMxZGM0MGU2NGFmMDBkZWFiMjE0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q0eF04cpOt20HPGWJGGMW2xzZDhbAeq4cdsItJX_J-c",
    },
  };

  const data_response = await fetch(
    `https://api.themoviedb.org/3/account/16263879?session_id=${id}`,
    options
  );
  const dataJson = await data_response.json();
  return dataJson;
};
