import { RootState } from "../../../App/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMBD_API_KEY}`,
  },
};
export const getReview = createAsyncThunk(
  "review/getReview",
  async ({ id, page = 1 }: { id: number; page?: number }, thunkAPI) => {
    const response = await fetch(
      `${import.meta.env.VITE_SITE_API_TMDB}/3/movie/${id}/reviews?api_key=${
        import.meta.env.VITE_TMBD_API_KEY
      }&language=en-US&page=${page}`,
      options
    );
    const data = await response.json();
    return data;
  }
);
export interface ReviewData {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: null | number;
  };
  content: string;
  created_at: string;
  id: number;
  updated_at: string;
  url: string;
}
type state = {
  data: ReviewData[];
  status: string;
  error: string;
};
const initialState: state = {
  data: [],
  status: "",
  error: "",
};
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    removeData(state, action) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReview.pending, (state) => {});
    builder.addCase(getReview.fulfilled, (state, action) => {
      state.data = action.payload.results;
    });
  },
});
export const { removeData } = reviewSlice.actions;
export const selectReview = (state: RootState) => state.reviewReducer.data;
export default reviewSlice.reducer;
