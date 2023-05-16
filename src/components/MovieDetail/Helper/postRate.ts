export const postRate = async (rate: string, id: string) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDM4ZjJmOGVmMjk5ZmI4ZTA5MWVlZDEyZWY0YzQyMiIsInN1YiI6IjYzOGMxZGM0MGU2NGFmMDBkZWFiMjE0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q0eF04cpOt20HPGWJGGMW2xzZDhbAeq4cdsItJX_J-c",
    },
    body: JSON.stringify(`{ value: ${Number(rate)}}`),
  };
  const session_id = localStorage.getItem("session_id");
  if (session_id === null) throw new Error("not having session id");
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?session_id=${session_id}`,
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};
