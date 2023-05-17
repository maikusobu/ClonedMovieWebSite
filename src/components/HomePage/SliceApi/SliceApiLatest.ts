import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../../../App/store";
const apikey = import.meta.env.VITE_TMBD_API_KEY;
type state = {
  data: unknown[];
  dataKey: unknown[];
  status: string;
  statusKey: string;
  error: string;
};
const initialState: state = {
  data: [],
  dataKey: [],
  status: "idle",
  statusKey: "idle",
  error: "",
};
export const getLatestMovie = createAsyncThunk(
  "latest/getLatestMovie",
  async () => {
    const data = await fetch(
      `
      ${
        import.meta.env.VITE_SITE_API_TMDB
      }/3/movie/upcoming?api_key=${apikey}&language=en-US&page=1`
    );
    return data.json();
  }
);
export const delayFulfilleLatestdMiddleware: Middleware =
  (store) => (next) => (action) => {
    if (action.type === getLatestMovie.fulfilled.toString()) {
      setTimeout(() => {
        next(action);
      }, 700);
    } else {
      next(action);
    }
  };
export const getTrailer = createAsyncThunk(
  "latest/getTrailer",
  async (movie_id) => {
    const data = await fetch(`
  ${
    import.meta.env.VITE_SITE_API_TMDB
  }/3/movie/${movie_id}/videos?api_key=${apikey}&language=en-US`);
    return data.json();
  }
);
const latestSlice = createSlice({
  name: "latest",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getLatestMovie.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getLatestMovie.fulfilled, (state, action) => {
      state.status = "success";

      state.data = [action.payload];
    });
    builder.addCase(getLatestMovie.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(getTrailer.pending, (state, action) => {
      state.statusKey = "pending";
    });
    builder.addCase(getTrailer.fulfilled, (state, action) => {
      state.statusKey = "success";
      state.dataKey = [action.payload];
    });
    builder.addCase(getTrailer.rejected, (state, action) => {
      state.statusKey = "error";
    });
  },
});
export default latestSlice.reducer;
export const latestData = (state: RootState) => state.latestReducer.data;
export const trailerData = (state: RootState) => state.latestReducer.dataKey;
export const trailerStatus = (state: RootState) =>
  state.latestReducer.statusKey;
export const latestStatus = (state: RootState) => state.latestReducer.status;
