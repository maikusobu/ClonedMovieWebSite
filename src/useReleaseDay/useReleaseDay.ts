import { toDate } from "date-fns";
import { MovieType } from "../Type/MovieType";
export function useReleaseDay(movie : MovieType) {
  const dataDate = [
    ...toDate(
      new Date(
        Number(movie?.release_date.split("-")[0]),
        Number(movie?.release_date.split("-")[1]),
        Number(movie?.release_date.split("-")[2])
      )
    )
      .toString()
      .split(" "),
  ];
  const dataResult = [[dataDate[2], dataDate[1]].join(", "), dataDate[3]];
  return dataResult.join(" ");
}
