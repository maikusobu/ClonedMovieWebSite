let approved: string | null;
let request_token_response: string | null;

export type session_id = {
  success: boolean;
  session_id: string;
  status_message?: string;
};

async function Authen() {
  let dataSession: Awaited<Promise<session_id | string>>;
  dataSession = "";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDM4ZjJmOGVmMjk5ZmI4ZTA5MWVlZDEyZWY0YzQyMiIsInN1YiI6IjYzOGMxZGM0MGU2NGFmMDBkZWFiMjE0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q0eF04cpOt20HPGWJGGMW2xzZDhbAeq4cdsItJX_J-c",
    },
  };
  const token = await fetch(
    "https://api.themoviedb.org/3/authentication/token/new",
    options
  );
  const response_token = await token.json();
  window.location.href = `${import.meta.env.VITE_SITE_TMDB}/authenticate/${
    response_token.request_token
  }?redirect_to=http://localhost:5173/login`;
}

export default Authen;
