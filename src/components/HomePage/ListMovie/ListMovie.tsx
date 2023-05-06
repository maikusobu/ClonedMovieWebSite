// import { useSelector } from "react-redux";
// import { listGenres } from "../SliceApi/SliceApi";
// import { Movie } from "../Movie/Movie";
// import { statusType } from "../SliceApi/SliceApi";
// import { PopularStatus } from "../SliceApi/SliceApi";
// import { PopularMovies } from "../SliceApi/SliceApi";
// import { Pagination } from "../Pagination/Pagination";
// export const ListMovie = () => {
//   const listData = useSelector(listGenres);
//   const statusTyp = useSelector(statusType);
//   const PopularMoviesDB = useSelector(PopularMovies);
//   const PopularStatusDB = useSelector(PopularStatus);
//   const data = listData.results;

//   if (PopularStatusDB === "pending" && statusTyp == "idle")
//     return <h1>Loading....</h1>;
//   else if (PopularStatusDB === "success" && statusTyp === "idle") {
//     return (
//       <div className="grid grid-cols-3 p-10">
//         {PopularMoviesDB.results.map((movie) => (
//           <Movie movie={movie} key={movie.id}></Movie>
//         ))}
//       </div>
//     );
//   }
//   if (statusTyp === "pending") return <h1>Loading.....</h1>;
//   else if (statusTyp === "success") {
//     return (
//       <div>
//         <div className="grid grid-cols-3 p-10">
//           {data.map((movie) => (
//             <Movie movie={movie} key={movie.id}></Movie>
//           ))}
//         </div>
//         <Pagination />
//       </div>
//     );
//   }
// };
