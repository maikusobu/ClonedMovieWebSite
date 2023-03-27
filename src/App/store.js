import { configureStore } from "@reduxjs/toolkit";
import genreSlice from "../components/SliceApi/SliceApi";
import trendSlice from "../components/SliceApi/SliceApiTrending";
import latestSlice from "../components/SliceApi/SliceApiLatest";
export const store = configureStore({
  reducer: {
    genreReducer: genreSlice,
    trendReducer: trendSlice,
    latestReducer: latestSlice,
  },
});
