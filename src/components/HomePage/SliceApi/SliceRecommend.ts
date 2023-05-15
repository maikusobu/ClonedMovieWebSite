import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MovieType } from "../../../Type/MovieType";
import { RootState } from "../../../App/store";
type StateType = {
  data: MovieType[];
  status: "idle" | "pending" | "success" | "failed";
  error?: string;
};
const initialState: StateType = {
  data: [],
  status: "idle",
  error: "",
};
const fetchRecommend = createAsyncThunk(
  "recommend/fetchRecommend",
  async ({ id }: { id: number }, thunkAPI) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${
        import.meta.env.VITE_TMBD_API_KEY
      }`
    );
    return data.json();
  }
);
const recommendSlice = createSlice({
  name: "recommend",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRecommend.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchRecommend.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload.results;
    });
    builder.addCase(fetchRecommend.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export { fetchRecommend };

export default recommendSlice.reducer;
export const selectRecommend = (state: RootState) =>
  state.recommendReducer.data;
export const selectRecommendStatus = (state: RootState) =>
  state.recommendReducer.status;
