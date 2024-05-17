import React, { useEffect, useState } from "react";
import axios from "axios";
import { StarIcon } from "@heroicons/react/20/solid";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { HiLogout, HiViewGrid, HiUserCircle } from "react-icons/hi";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { selectClasses } from "@mui/material";
import { getRecomendMovie, getSearchMovie } from "../redux/actions/movieAction";
import { setMovieId } from "../redux/reducers/movieReducers";
import BackToTopButton from "../component/backtotop";

//Initial API KEY
const API_KEY = "77b3a402465e7a82a0baf4ac6fbae43d";

export default function MovieApp() {
  const [isNotFound, SetIsNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [numOfItems, setNumOfItems] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [logoutModal, setLogoutModal] = useState(false);
  const [user, setDataUser] = useState({});
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

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
        // console.log("Decode : ", decoded);
        setDataUser(decoded);
        if (decoded?.exp < new Date() / 1000) {
          alert("token expire");
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
          // const res = await axios.get(
          //   "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
          //   {
          //     headers: {
          //       Authorization: `Bearer123 ${localStorage.getItem("token")}`,
          //     },
          //   }
          // );
          const resJson = await res?.json();
          setDataUser(resJson.data);

          if (res?.status === 401) {
            alert("token expire");
            return;
          }
          console.log("first", resJson);
        } catch (error) {
          alert("token expire");
          console.log("error ", error);
        }
      }
    }
    fetchData();
  }, []);

  let location = useLocation();
  // console.log("location : ", location.state.title);

  //Fetching Data API {{ SEARCH }}
  const query = useSelector((state) => state?.movies.searchQuery);
  const search = useSelector((state) => state?.movies.searchResult);
  // console.log("query result", query);
  // console.log("search Result", search);
  useEffect(() => {
    dispatch(getSearchMovie(query));
    setIsLoading(false);
  }, []);

  //Fetching Data API {{ SEARCH }}
  const data = useSelector((state) => state?.movies?.recomend);
  // console.log("recomend data ", data);
  useEffect(() => {
    dispatch(getRecomendMovie());
    setIsLoading(false);
  }, []);

  // Search Function
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle changes in the number of items select
  const handleNumOfItemsChange = (event) => {
    setNumOfItems(parseInt(event.target.value));
  };

  // console.log("searchQuery ", searchQuery);

  //to lowerchase & filtering
  const filteredData = data
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery?.toLowerCase())
    )
    .slice(0, numOfItems);

  // console.log("Filterd Data ", filteredData);

  // Validasi Input Kosong
  useEffect(() => {
    if (search?.length === 0 && query !== "") {
      SetIsNotFound(true);
    } else {
      SetIsNotFound(false);
    }
  }, [search, query]);

  return (
    <div className="text-white">
      {" "}
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
          <li className="my-2 mx-4  hover:text-yellow-400">
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
      </div>
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
      {!isLoading && (
        <section>
          {/* Search Movie Movies */}
          <div className="flex justify-center mt-12 ">
            <div className="py-12">
              <div className=" text-center p-12">
                <p className="text-5xl pb-4">
                  <strong>Search "{query}"</strong>
                </p>
                <p className="pb-5">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit nobis pariatur explicabo,
                </p>
              </div>
              {/* Show Search Movie */}
              <div>
                {isNotFound ? ( // Tampilkan pesan "Not Found" jika tidak ada hasil pencarian
                  <div className="">
                    <div className="text-center font-bold text-red-500  text-3xl h-[200px] max-w-[90%] mx-auto border flex justify-center items-center">
                      Movie Not Found
                    </div>
                    <div className=" text-center p-12">
                      <p className="text-5xl pb-4">
                        <strong>Recomend Movies</strong>
                      </p>
                      <p className="pb-5">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Reprehenderit nobis pariatur explicabo,
                      </p>
                      <div className="flex justify-center gap-4 mt-4">
                        {/* Search */}
                        <div>
                          <input
                            type="text"
                            name="search"
                            placeholder="Search"
                            onChange={handleSearchChange}
                            className="rounded-md p-2 text-black"
                          />
                        </div>
                        {/* Num of Items */}
                        <div>
                          <select
                            id="numOfItems"
                            className="text-black py-2 px-5 rounded-md"
                            value={numOfItems}
                            onChange={handleNumOfItemsChange}
                          >
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="mx-auto max-w-[90%] grid grid-cols-5 gap-8 pb-2">
                      {filteredData?.map((e) => (
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
                      ))}
                    </div>
                  </div>
                ) : (
                  //Result Search
                  <div className="mx-auto max-w-[90%] grid grid-cols-5 gap-8 pb-2 ">
                    {search?.map((e) => (
                      <div
                        key={e?.id}
                        onClick={() => {
                          navigate("/detail");
                          dispatch(setMovieId(e?.id));
                        }}
                        className="w-[250px] px-3"
                      >
                        {e?.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w200/${e?.poster_path}`}
                            alt=""
                            className="rounded-md w-full hover:scale-105"
                          />
                        ) : (
                          <div className="bg-gray-300 rounded-md w-full h-[340px] flex justify-center items-center">
                            <p className="text-gray-500">Image Not Available</p>
                          </div>
                        )}
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
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      <BackToTopButton />
    </div>
  );
}
