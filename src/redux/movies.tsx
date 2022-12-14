import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface MoviesState {
  searchTerm: string;
  selectedMovieID: number;
}

const initialState: MoviesState = {
  searchTerm: "",
  selectedMovieID: 0,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedMovieID: (state, action: PayloadAction<number>) => {
      state.selectedMovieID = action.payload;
    },
  },
});

export const { setSearchTerm, setSelectedMovieID } = moviesSlice.actions;

export default moviesSlice.reducer;
