import axios from "axios";
import {
  setMovieDetail,
  setNowPlayingMovies,
  setPopularMovies,
  setRecomendMovies,
  setSearchResult,
  setTopRatedMovies,
  setUpComingMovies,
} from "../reducers/movieReducers";

//Initial API KEY
const API_KEY = "77b3a402465e7a82a0baf4ac6fbae43d";

// Function to get Popular Movie
export const getPopularMovie = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    console.log("response popular ", response?.data?.results);
    dispatch(setPopularMovies(response?.data?.results));
  } catch (error) {
    console.log("error ", error);
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

// Function to get Top Movie
export const getTopMovie = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    );
    console.log("response Top Rated Movie ", response?.data?.results);
    dispatch(setTopRatedMovies(response?.data?.results));
  } catch (error) {
    console.log("error ", error);
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

// Function to get Up Coming
export const getUpComingMovie = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
    );
    console.log("response Up Coming Movie ", response?.data?.results);
    dispatch(setUpComingMovies(response?.data?.results));
  } catch (error) {
    console.log("error ", error);
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

// Function to get Now Playing
export const getNowPlayingMovie = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
    );
    console.log("response Now Playing Movie ", response?.data?.results);
    dispatch(setNowPlayingMovies(response?.data?.results));
  } catch (error) {
    console.log("error ", error);
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

// Function to get Detail Movie
export const getDetailMovie = (id) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    );
    console.log("response Id Detail Movie ", response?.data);
    dispatch(setMovieDetail(response?.data));
  } catch (error) {
    console.log("error ", error);
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

// Function to get Search
export const getSearchMovie = (title) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${API_KEY}`
    );
    console.log("response Search Movie ", response?.data.results);
    dispatch(setSearchResult(response?.data.results));
  } catch (error) {
    console.log("error ", error);
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

// Function to get Recomended / Discover
export const getRecomendMovie = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
    );
    console.log("response Recomend Movie ", response?.data?.results);
    dispatch(setRecomendMovies(response?.data.results));
  } catch (error) {
    console.log("error ", error);
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};
