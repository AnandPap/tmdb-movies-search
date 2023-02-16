import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface MoviesState {
  searchTerm: string;
  selectedMovieID: number;
  loading: boolean;
}

const initialState: MoviesState = {
  searchTerm: "",
  selectedMovieID: 0,
  loading: false,
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setSearchTerm, setSelectedMovieID, setLoading } =
  moviesSlice.actions;

export default moviesSlice.reducer;
