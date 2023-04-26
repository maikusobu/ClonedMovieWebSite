import { useState } from "react";
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
  return dataDate;
}
