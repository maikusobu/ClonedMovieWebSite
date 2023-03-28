import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const getTrendingMovie = createAsyncThunk(
  "trend/getTrendingMovie",
  async (time) => {
    console.log(time);
    const getDB = await fetch(`
  https://api.themoviedb.org/3/trending/movie/${time}?api_key=${apikey}`);
    return getDB.json();
  }
);
const apikey = "d438f2f8ef299fb8e091eed12ef4c422";
const initialState = {
  data: [],
  toggleTrending: true,
  status: "idle",
  error: "",
};
export const delayFulfilledMiddleware = (store) => (next) => (action) => {
  if (action.type === getTrendingMovie.fulfilled.toString()) {
    setTimeout(() => {
      next(action);
    }, 2000);
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

export const toggleState = (state) => state.trendReducer.toggleTrending;
export const { toggleTrending } = trendSlice.actions;
export const trendingData = (state) => state.trendReducer.data;
export const trendingStatus = (state) => state.trendReducer.status;
