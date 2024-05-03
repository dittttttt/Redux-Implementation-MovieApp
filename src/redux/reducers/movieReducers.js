import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popular: [],
  topRated: [],
  upComing: [],
  nowPlaying: [],
  recomend: [],
  searchResult: [],
  movieId: null,
  movieDetail: null,
  searchQuery: null,
}; //data array

const movieSlicer = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setPopularMovies: (state, action) => {
      console.log("state Popular ", state);
      console.log("action Popular ", action.payload);
      state.popular = action.payload;
    },
    setTopRatedMovies: (state, action) => {
      console.log("state Top Rated ", state);
      console.log("action Top Rated ", action.payload);
      state.topRated = action.payload;
    },
    setUpComingMovies: (state, action) => {
      console.log("state Up Coming ", state);
      console.log("action Up Coming ", action.payload);
      state.upComing = action.payload;
    },
    setNowPlayingMovies: (state, action) => {
      console.log("state Now Playing ", state);
      console.log("action Now Playing", action.payload);
      state.nowPlaying = action.payload;
    },
    setMovieId: (state, action) => {
      state.movieId = action.payload;
    },
    setMovieDetail: (state, action) => {
      state.movieDetail = action.payload;
    },
    setSearchQuery: (state, action) => {
      console.log("action search query ", action);
      state.searchQuery = action.payload;
    },
    setSearchResult: (state, action) => {
      console.log("action search result ", action);
      state.searchResult = action.payload;
    },
    setRecomendMovies: (state, action) => {
      console.log("action Recomend result ", action);
      state.recomend = action.payload;
    },
    setToken: (state, action) => {
      console.log("action Login Token ", action);
      state.token = action.payload;
    },
  },
});

export const {
  setPopularMovies,
  setTopRatedMovies,
  setUpComingMovies,
  setNowPlayingMovies,
  setMovieId,
  setMovieDetail,
  setSearchQuery,
  setSearchResult,
  setRecomendMovies,
  setToken,
} = movieSlicer.actions;

export default movieSlicer.reducer;
