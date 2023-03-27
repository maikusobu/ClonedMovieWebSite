import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
const apikey = "d438f2f8ef299fb8e091eed12ef4c422";

export const getGenre = createAsyncThunk("genre/getGenre", async () => {
  const getDB = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`
  );
  const getJson = getDB.json();
  return getJson;
});
export const getListGenre = createAsyncThunk(
  "genre/getListGenre",
  async ({ id, page }, thunkAPI) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_watch_monetization_types=flatrate&with_genres=${id}`
    );
    return response.json();
  }
);
export const getPopularMovie = createAsyncThunk(
  "genre/getPopularMovie",

  async (page) => {
    const getDB = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_watch_monetization_types=free`
    );
    const getJson = getDB.json();

    return getJson;
  }
);
const initialState = {
  data: [],
  dataType: [],
  dataPopular: [],
  dataTrending: [],
  status: "idle",
  statusType: "idle",
  statusPopular: "idle",

  error: "",
};
const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getGenre.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getGenre.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload.genres;
    });
    builder.addCase(getGenre.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(getListGenre.fulfilled, (state, action) => {
      state.statusType = "success";
      state.dataType = action.payload;
    });
    builder.addCase(getListGenre.pending, (state, action) => {
      state.statusType = "pending";
    });
    builder.addCase(getPopularMovie.pending, (state, action) => {
      state.statusPopular = "pending";
    });
    builder.addCase(getPopularMovie.fulfilled, (state, action) => {
      state.statusPopular = "success";
      state.dataPopular = action.payload;
    });
  },
});
export default genreSlice.reducer;
export const genreSelector = (state) => state.genreReducer.data;
export const listGenres = (state) => state.genreReducer.dataType;
export const statusType = (state) => state.genreReducer.statusType;
export const PopularMovies = (state) => state.genreReducer.dataPopular;
export const PopularStatus = (state) => state.genreReducer.statusPopular;
