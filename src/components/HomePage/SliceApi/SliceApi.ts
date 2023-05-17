import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MovieType } from "../../../Type/MovieType";
import { RootState } from "../../../App/store";
import { movieidType } from "../../SearchFilter/SearchFilterContainer";
const apikey = import.meta.env.VITE_TMBD_API_KEY;

type SliceApiProp = {
  data: MovieType[];
  status: string;
  dataType: MovieType[];
  statusType: string;
  dataPopular: (MovieType & { popularity: number })[];
  statusPopular: string;
  error: string;
};

export const getGenre = createAsyncThunk("genre/getGenre", async () => {
  const getDB = await fetch(
    `${
      import.meta.env.VITE_SITE_API_TMDB
    }/3/genre/movie/list?api_key=${apikey}&language=en-US`
  );
  const getJson = getDB.json();
  return getJson;
});
export const getListGenre = createAsyncThunk(
  "genre/getListGenre",
  async ({ id, page }: { id: number; page: number }, thunkAPI) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_SITE_API_TMDB
      }/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_watch_monetization_types=flatrate&with_genres=${id}`
    );
    return response.json();
  }
);

export const getPopularMovie = createAsyncThunk(
  "genre/getPopularMovie",
  async ({ page, sort, id, min, max }: movieidType, thunkAPI) => {
    const getDB = await fetch(
      `${
        import.meta.env.VITE_SITE_API_TMDB
      }/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=${sort}&include_adult=false&include_video=true&page=${page}&vote_average.gte=${Number(
        min / 10
      )}&vote_average.lte=${Number(
        max / 10
      )}&with_watch_monetization_types=free${
        id.length > 0 ? "&with_genres=" + id.join(",") : ""
      }`
    );
    const getJson = getDB.json();
    return getJson;
  }
);
const initialState: SliceApiProp = {
  data: [],
  dataType: [],
  dataPopular: [],
  status: "idle",
  statusType: "idle",
  statusPopular: "idle",
  error: "",
};
const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    RemoveData(state) {
      state.dataPopular = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getGenre.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getGenre.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = "success";
      state.data = action.payload.genres;
    });
    builder.addCase(getGenre.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(
      getListGenre.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.statusType = "success";
        state.dataType = action.payload;
      }
    );
    builder.addCase(getListGenre.pending, (state, action) => {
      state.statusType = "pending";
    });
    builder.addCase(getPopularMovie.pending, (state, action) => {
      state.statusPopular = "pending";
    });
    builder.addCase(
      getPopularMovie.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.statusPopular = "success";
        action.payload.results.forEach((result: any) => {
          if (!state.dataPopular.some((item) => item.id === result.id)) {
            state.dataPopular.push(result);
          }
        });
      }
    );
  },
});
export default genreSlice.reducer;
export const { RemoveData } = genreSlice.actions;
export const genreSelector = (state: RootState) => state.genreReducer.data;
export const listGenres = (state: RootState) => state.genreReducer.dataType;
export const statusType = (state: RootState) => state.genreReducer.statusType;
export const PopularMovies = (state: RootState) =>
  state.genreReducer.dataPopular;
export const PopularStatus = (state: RootState) =>
  state.genreReducer.statusPopular;
