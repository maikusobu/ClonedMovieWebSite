import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
const apikey = "d438f2f8ef299fb8e091eed12ef4c422";
const initialState = {
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
      https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&language=en-US&page=1`
    );
    return data.json();
  }
  //   async (time) => {
  //     console.log(time);
  //     const getDB = await fetch(`
  //   https://api.themoviedb.org/3/trending/movie/${time}?api_key=${apikey}`);
  //     return getDB.json();
  //   }
);
export const getTrailer = createAsyncThunk(
  "latest/getTrailer",
  async (movie_id) => {
    const data = await fetch(`
  https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${apikey}&language=en-US`);
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
export const latestData = (state) => state.latestReducer.data;
export const trailerData = (state) => state.latestReducer.dataKey;
export const trailerStatus = (state) => state.latestReducer.statusKey;
export const latestStatus = (state) => state.latestReducer.status;
