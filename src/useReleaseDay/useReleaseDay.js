import { toDate } from "date-fns";
export function useReleaseDay(movie) {
  const dataDate = [
    ...toDate(
      new Date(
        movie?.release_date.split("-")[0],
        movie?.release_date.split("-")[1],
        movie?.release_date.split("-")[2]
      )
    )
      .toString()
      .split(" "),
  ];
  const dataResult = [[dataDate[2], dataDate[1]].join(", "), dataDate[3]];
  return dataResult.join(" ");
}
