import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MoviesState {
  searchTerm: string;
  selectedMovieID: number;
  loading: boolean;
  darkMode: boolean;
  currentPage: string;
}

const initialState: MoviesState = {
  searchTerm: "",
  selectedMovieID: 0,
  loading: false,
  darkMode: true,
  currentPage: "tvshows",
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setSelectedMovieID,
  setLoading,
  setDarkMode,
  setCurrentPage,
} = moviesSlice.actions;

export default moviesSlice.reducer;
