import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type resultsType = {
  id: number;
  original_name: string;
  original_title: string;
  name: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
};
type fetchResultsActionType = {
  [key: string]: resultsType[];
};
interface fetchResultsType {
  [key: string]: resultsType[];
  movies: resultsType[];
  tvshows: resultsType[];
}

interface MoviesState {
  searchTerm: string;
  selectedMovieID: number;
  loading: boolean;
  darkMode: boolean;
  fetchResults: fetchResultsType;
}

export const initialState: MoviesState = {
  searchTerm: "",
  selectedMovieID: 0,
  loading: false,
  darkMode: true,
  fetchResults: { movies: [], tvshows: [] },
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
    setFetchResults: (state, action: PayloadAction<fetchResultsActionType>) => {
      state.fetchResults = {
        ...state.fetchResults,
        ...action.payload,
      };
    },
  },
});

export const {
  setSearchTerm,
  setSelectedMovieID,
  setLoading,
  setDarkMode,
  setFetchResults,
} = moviesSlice.actions;

export default moviesSlice.reducer;
