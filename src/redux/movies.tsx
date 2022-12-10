import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface MoviesState {
  searchTerm: string;
}

const initialState: MoviesState = {
  searchTerm: "",
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = moviesSlice.actions;

export const selectMovie = (state: RootState) => state.movies.searchTerm;

export default moviesSlice.reducer;
