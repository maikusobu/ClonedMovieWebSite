// export const postRate = async (rate: string, id: string) => {

//  const options = {
//    method: "POST",
//    headers: {
//      accept: "application/json",
//      "content-type": "application/json",
//      Authorization:
//        "Bearer ${import.meta.env.VITE_ACCESS_TOKEN}",
//    },
//    body: JSON.stringify({ media_type: "movie", media_id: id, favorite: true }),
//  };

//   const session_id = localStorage.getItem("session_id");
//   if (session_id === null) throw new Error("not having session id");
//  fetch(
//    `https://api.themoviedb.org/3/account/_/favorite?session_id=${session_id}`,
//    options
//  )
//    .then((response) => response.json())
//    .then((response) => console.log(response))
//    .catch((err) => console.error(err));
// };
