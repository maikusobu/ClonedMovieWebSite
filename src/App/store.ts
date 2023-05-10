import { configureStore } from "@reduxjs/toolkit";
import genreSlice from "../components/HomePage/SliceApi/SliceApi";
import trendSlice from "../components/HomePage/SliceApi/SliceApiTrending";
import latestSlice from "../components/HomePage/SliceApi/SliceApiLatest";
import thunk from "redux-thunk";
import { applyMiddleware } from "@reduxjs/toolkit";
import { delayFulfilledMiddleware } from "../components/HomePage/SliceApi/SliceApiTrending";
import { delayFulfilleLatestdMiddleware } from "../components/HomePage/SliceApi/SliceApiLatest";
import reviewSlice from "../components/HomePage/SliceApi/SliceReview";
export const store = configureStore({
  reducer: {
    genreReducer: genreSlice,
    trendReducer: trendSlice,
    latestReducer: latestSlice,
    reviewReducer: reviewSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(delayFulfilledMiddleware)
      .concat(delayFulfilleLatestdMiddleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
