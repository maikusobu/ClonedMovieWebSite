export const deleteSession = async () => {
  const session_id = localStorage.getItem("session_id");
  if (typeof session_id === "string" && session_id !== null) {
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDM4ZjJmOGVmMjk5ZmI4ZTA5MWVlZDEyZWY0YzQyMiIsInN1YiI6IjYzOGMxZGM0MGU2NGFmMDBkZWFiMjE0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q0eF04cpOt20HPGWJGGMW2xzZDhbAeq4cdsItJX_J-c",
      },
      body: JSON.stringify({ session_id: session_id }),
    };
    fetch("https://api.themoviedb.org/3/authentication/session", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        alert("successfully deleted, you should reload the page");
      })
      .catch((err) => console.error(err));
  }
};
