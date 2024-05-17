import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { StarIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "animate.css";
import { Dropdown } from "flowbite-react";
import { HiLogout } from "react-icons/hi";
import { Toast } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNowPlayingMovie,
  getPopularMovie,
  getTopMovie,
  getUpComingMovie,
} from "./redux/actions/movieAction";
import { setMovieId, setSearchQuery } from "./redux/reducers/movieReducers";
import { toast } from "react-toastify";
import BackToTopButton from "./component/backtotop";
import Footer from "./component/footer";

export default function MovieApp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const token = localStorage.getItem("token");
  const [user, setDataUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      if (localStorage.getItem("login") === "google component") {
        const decoded = jwtDecode(localStorage.getItem("token"));
        // console.log("Data User : ", decoded);
        setDataUser(decoded);
        // console.log("User : ", user);
        if (decoded?.exp < new Date() / 1000) {
          toast.warning("Anda Belum Login ");
          localStorage.removeItem("token");
        }
      } else {
        try {
          const res = await fetch(
            "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const resJson = await res?.json();
          setDataUser(resJson.data);
          if (res?.status === 401) {
            toast.warning("Anda Belum Login ");
            return;
          }
          console.log("first", resJson);
        } catch (error) {
          toast.warning("Anda Belum Login ");
          // console.log("error ", error);
        }
      }
    }
    fetchData();
  }, []);

  //Passing Data API {{ POPULAR }}
  const popular = useSelector((state) => state?.movies?.popular);
  // console.log("Popular ", popular);
  useEffect(() => {
    dispatch(getPopularMovie());
    setIsLoading(false);
  }, []);

  //Passing Data API {{ TOP RATED }}
  const topRated = useSelector((state) => state?.movies?.topRated);
  // console.log("Top Rated ", topRated);
  useEffect(() => {
    dispatch(getTopMovie());
    setIsLoading(false);
  }, []);

  //Passing Data API {{ NOW PLAYING }}
  const nowPlaying = useSelector((state) => state?.movies?.nowPlaying);
  // console.log("Now Playing ", nowPlaying);
  useEffect(() => {
    dispatch(getNowPlayingMovie());
    setIsLoading(false);
  }, []);

  //Passing Data API {{ UP COMING }}
  const upcoming = useSelector((state) => state?.movies?.upComing);
  // console.log("Up Coming ", upcoming);
  useEffect(() => {
    dispatch(getUpComingMovie());
    setIsLoading(false);
  }, []);

  //AutoPlayMethod Slick
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const fade = {
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  return (
    <div className="text-white">
      {logoutModal && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col justify-center items-center bg-gray-900 p-8 rounded-lg shadow-md border animate__animated animate__bounceInDown">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>

            <p className="text-xl text-yellow-600 px-8 py-2">
              <strong>Upsss...</strong>
            </p>
            <p className=" px-8">Are you sure to leave this site?</p>
            <div>
              <button
                onClick={() => setLogoutModal(false)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-12 hover:bg-yellow-600"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setLogoutModal(false);
                  localStorage.removeItem("token");
                  navigate("/login");
                  toast.success("Logout berhasil");
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md mt-12 hover:bg-red-700 ms-3"
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Navbar  */}
      <div className="flex justify-between items-center text-xl py-5 px-12 bg-gray-900 fixed top-0 left-0 w-full shadow-md z-10">
        <a href="/" className="text-3xl">
          <strong className="text-yellow-500">PRIME</strong>MOVIES
        </a>
        <ul className="flex">
          <li className="my-2 mx-4 text-yellow-400">
            <a href="/">Home</a>
          </li>
          <li className="my-2 mx-4 hover:text-yellow-400">
            <a href="/top-rated">Top Rated</a>
          </li>
          <li className="my-2 mx-4  hover:text-yellow-400">
            <a href="/popular">Popular</a>
          </li>
          <li className="my-2 mx-4  hover:text-yellow-400">
            <a href="/upcoming">Up Coming</a>
          </li>
        </ul>
        <div className="flex gap-4 ">
          {token ? (
            <Dropdown inline label={user?.name?.split(" ")[0]}>
              <Dropdown.Header>
                <div className="flex gap-4 items-center">
                  {user?.picture ? (
                    <img
                      src={user?.picture}
                      alt="User Picture"
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <img
                      src="/src/assets/user.png"
                      alt="User Picture"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <span className="block text-sm">{user?.name}</span>
                    <span className="block truncate text-sm font-medium">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  setLogoutModal(true);
                }}
                icon={HiLogout}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <div>
              <button
                className="py-2 px-4 rounded bg-yellow-600 hover:bg-yellow-700"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Modal Alert */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col justify-center items-center bg-gray-900 p-8 rounded-lg shadow-md border animate__animated animate__bounceInDown">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>

            <p className="text-xl text-yellow-600 px-8 py-2">
              <strong>Upsss...</strong>
            </p>
            <p className=" px-8">What do you want to search, Broo???</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-md mt-12 hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-yellow-600 fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {/* Content */}
      {!isLoading && (
        <section>
          {/* Slicker Search */}
          <div>
            <div className="slider-container mt-6">
              <div className="absolute -z-20 max-h-[600px] object-cover w-full top-0 left-0 filter brightness-50 contrast-100">
                <Slider {...fade}>
                  {nowPlaying.map((e) => (
                    <div className="min-h-[600px] relative">
                      <img
                        className="absolute -z-20 max-h-[600px] object-cover w-full top-0 left-0 filter brightness-50 contrast-100"
                        src={`https://image.tmdb.org/t/p/w500/${e?.backdrop_path}`}
                        alt=""
                      />
                      <div className="flex flex-row justify-center items-center p-12 relative"></div>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="h-[600px]  flex flex-col justify-center items-center">
                <div className=" text-center">
                  <p className="text-5xl pb-4">
                    <strong>
                      <span>Enjoy With Our Movies</span>
                    </strong>
                  </p>
                  <p className="pb-5">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Reprehenderit nobis pariatur explicabo,
                  </p>
                  <div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const searchData = e.target.search.value;
                        console.log("ini adalah Search : ", searchData);
                        if (searchData?.trim() === "")
                          return setShowModal(true);
                        navigate(`/resultSearch`);
                        dispatch(setSearchQuery(searchData));
                      }}
                      className="flex justify-center items-center"
                    >
                      <input
                        type="text"
                        name="search"
                        placeholder="Search"
                        className=" p-2 text-white bg-transparent border"
                      />
                      <button
                        type="submit"
                        className="border p-2 bg-yellow-600 hover:bg-yellow-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                          />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Top Rated Movies */}
          <div className="flex justify-center mt-4">
            <div className="py-4">
              <div className=" text-center py-">
                <p className="text-5xl pb-4">
                  <strong>Top Rated Movies</strong>
                </p>
                <p className="pb-5">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit nobis pariatur explicabo,
                </p>
              </div>
              {/* Show Top Rated Movie */}
              <div>
                <div className=" mx-auto grid grid-cols-5 gap-8 pb-2 justify-center px-12 py-6">
                  {topRated
                    ?.map((e) => (
                      <div
                        key={e?.id}
                        onClick={() => {
                          navigate("/detail");
                          dispatch(setMovieId(e?.id));
                        }}
                        className="w-[250px] px-3"
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w200/${e?.poster_path}`}
                          alt=""
                          className="rounded-md w-full hover:scale-105"
                        />
                        <p className="mt-4">
                          <strong>{e?.title}</strong>
                        </p>
                        <div className="flex">
                          <p className="text-gray-400">{e?.release_date}</p>
                        </div>
                        <div className="flex">
                          <StarIcon className="h-6  text-yellow-500"></StarIcon>
                          <p className="ms-1">{e?.vote_average.toFixed(1)}</p>
                        </div>
                      </div>
                    ))
                    .slice(0, 10)}
                </div>
                <div className="text-center m-8">
                  <a
                    href="/top-rated"
                    className="bg-green-600 px-8 py-3 rounded-xl border hover:bg-green-700 "
                  >
                    <strong>View All</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Now Playing Slicker*/}
          <div>
            <div className=" text-center">
              <p className="text-5xl pb-4">
                <strong>Now Playing</strong>
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit nobis pariatur explicabo,
              </p>
            </div>
            <div className="slider-container mt-6">
              <Slider {...settings}>
                {nowPlaying.map((e) => (
                  <div className="min-h-[500px] relative">
                    <img
                      className="absolute -z-20 max-h-[720px] object-cover w-full top-0 left-0 filter brightness-50 contrast-100"
                      src={`https://image.tmdb.org/t/p/w500/${e?.backdrop_path}`}
                      alt=""
                    />
                    <div className="flex flex-row justify-center items-center p-12 relative">
                      <div>
                        <img
                          src={`https://image.tmdb.org/t/p/w400/${e?.poster_path}`}
                          alt=""
                          className="max-w-100"
                        />
                      </div>
                      <div className="max-w-[750px] p-12">
                        <p className=" text-6xl">
                          <strong>{e?.title}</strong>
                        </p>
                        <div className="flex mt-5">
                          <StarIcon className="h-6  text-yellow-500"></StarIcon>
                          <p className="mx-2">{e?.vote_average.toFixed(1)}</p>
                        </div>
                        <p className="py-5">{e?.overview.slice(0, 150)} ...</p>
                        <button
                          className="border bg-yellow-600 rounded-full px-8 py-2 hover:bg-yellow-700"
                          key={e?.id}
                          onClick={() => {
                            navigate("/detail");
                            dispatch(setMovieId(e?.id));
                          }}
                        >
                          <strong>Detail</strong>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          {/* Popular Movies */}
          <div className="flex justify-center">
            <div className="py-12">
              <div className=" text-center py-">
                <p className="text-5xl pb-4">
                  <strong> Popular Movies</strong>
                </p>
                <p className="pb-5">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit nobis pariatur explicabo,
                </p>
              </div>
              {/* Show Popular Movie */}
              <div>
                <div className=" mx-auto grid grid-cols-5 gap-8 pb-2 justify-center p-12">
                  {popular
                    ?.map((e) => (
                      <div
                        key={e?.id}
                        onClick={() => {
                          navigate("/detail");
                          dispatch(setMovieId(e?.id));
                        }}
                        className="w-[250px] px-3"
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w200/${e?.poster_path}`}
                          alt=""
                          className="rounded-md w-full hover:scale-105"
                        />
                        <p className="mt-4">
                          <strong>{e?.title}</strong>
                        </p>
                        <div className="flex">
                          <p className="text-gray-400">{e?.release_date}</p>
                        </div>
                        <div className="flex">
                          {/* icon view */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                          <p className="ms-1">
                            {e?.popularity
                              .toFixed(3)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          </p>
                        </div>
                      </div>
                    ))
                    .slice(0, 10)}
                </div>
                <div className="text-center m-8">
                  <a
                    href="/popular"
                    className="bg-green-600 px-8 py-3 rounded-xl border hover:bg-green-700 "
                  >
                    <strong>View All</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Up Coming Movies */}
          <div className="flex justify-center">
            <div className="py-12">
              <div className=" text-center py-">
                <p className="text-5xl pb-4">
                  <strong> Up Coming Movies</strong>
                </p>
                <p className="pb-5">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit nobis pariatur explicabo,
                </p>
              </div>
              {/* Show Popular Movie */}
              <div>
                <div className=" mx-auto grid grid-cols-5 gap-8 pb-2 justify-center p-12">
                  {upcoming
                    ?.map((e) => (
                      <div
                        key={e?.id}
                        onClick={() => {
                          navigate("/detail");
                          dispatch(setMovieId(e?.id));
                        }}
                        className="w-[250px] px-3"
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w200/${e?.poster_path}`}
                          alt=""
                          className="rounded-md w-full hover:scale-105"
                        />
                        <p className="mt-4">
                          <strong>{e?.title}</strong>
                        </p>
                        <div className="flex">
                          <p className="text-gray-400">{e?.release_date}</p>
                        </div>
                      </div>
                    ))
                    .slice(0, 10)}
                </div>
                <div className="text-center m-8">
                  <a
                    href="/upcoming"
                    className="bg-green-600 px-8 py-3 rounded-xl border hover:bg-green-700 "
                  >
                    <strong>View All</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <BackToTopButton />
      <Footer />
    </div>
  );
}
