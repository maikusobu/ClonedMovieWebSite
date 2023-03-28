import { configureStore } from "@reduxjs/toolkit";
import genreSlice from "../components/SliceApi/SliceApi";
import trendSlice from "../components/SliceApi/SliceApiTrending";
import latestSlice from "../components/SliceApi/SliceApiLatest";
import thunk from "redux-thunk";
import { applyMiddleware } from "@reduxjs/toolkit";
import { delayFulfilledMiddleware } from "../components/SliceApi/SliceApiTrending";
export const store = configureStore({
  reducer: {
    genreReducer: genreSlice,
    trendReducer: trendSlice,
    latestReducer: latestSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(delayFulfilledMiddleware),
});
