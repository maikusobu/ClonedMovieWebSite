import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../../../App/store";
import { MovieType } from "../../../Type/MovieType";
const apikey = import.meta.env.VITE_TMBD_API_KEY;
export const getTrendingMovie = createAsyncThunk(
  "trend/getTrendingMovie",
  async (time: string) => {
    const getDB = await fetch(`
 ${
   import.meta.env.VITE_SITE_API_TMDB
 }/3/trending/movie/${time}?api_key=${apikey}`);
    return getDB.json();
  }
);

type State = {
  data: { results: MovieType[] }[];
  toggleTrending: boolean;
  status: string;
  error: string;
};
const initialState: State = {
  data: [],
  toggleTrending: true,
  status: "idle",
  error: "",
};
export const delayFulfilledMiddleware: Middleware =
  (store) => (next) => (action) => {
    if (action.type === getTrendingMovie.fulfilled.toString()) {
      setTimeout(() => {
        let result = next(action);
      }, 500);
    } else {
      next(action);
    }
  };
const trendSlice = createSlice({
  name: "trend",
  initialState,
  reducers: {
    toggleTrending(state, action) {
      state.toggleTrending = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getTrendingMovie.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getTrendingMovie.fulfilled, (state, action) => {
      state.status = "success";
      state.data = [action.payload];
    });
    builder.addCase(getTrendingMovie.rejected, (state, action) => {
      state.status = "error";
    });
  },
});
export default trendSlice.reducer;

export const toggleState = (state: RootState) =>
  state.trendReducer.toggleTrending;
export const { toggleTrending } = trendSlice.actions;
export const trendingData = (state: RootState) => state.trendReducer.data;
export const trendingStatus = (state: RootState) => state.trendReducer.status;
