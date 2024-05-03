import React, { useEffect, useState } from "react";
import axios from "axios";
import { StarIcon } from "@heroicons/react/20/solid";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Dropdown } from "flowbite-react";
import { HiLogout, HiViewGrid, HiUserCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getDetailMovie } from "./redux/actions/movieAction";

//Initial API KEY
const API_KEY = "77b3a402465e7a82a0baf4ac6fbae43d";

export default function MovieApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setDataUser] = useState({});
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      if (localStorage.getItem("login") === "google component") {
        const decoded = jwtDecode(localStorage.getItem("token"));
        console.log("Decode : ", decoded);
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

  //Fetching Data API {{ Detail Search }}
  const id = useSelector((state) => state?.movies?.movieId);
  const detail = useSelector((state) => state?.movies?.movieDetail);
  console.log("id ", id);
  console.log("movieDetail ", detail);
  useEffect(() => {
    dispatch(getDetailMovie(id));
    setIsLoading(false);
  }, []);

  return (
    <div className="text-white">
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
              localStorage.removeItem("token");
              navigate("/login");
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
          {/* Content */}
          <div key={detail?.id} className="mx-24 mt-28">
            <div className="border rounded-xl">
              <div className="min-h-[720px] relative">
                <img
                  className="absolute -z-20 max-h-[720px] object-cover w-full top-0 left-0 filter brightness-50 contrast-100 rounded-xl"
                  src={`https://image.tmdb.org/t/p/w500/${detail?.backdrop_path}`}
                  alt=""
                />
                <div className="flex flex-row justify-center items-center pt-12 px-16 relative">
                  <div>
                    <img
                      src={`https://image.tmdb.org/t/p/w400/${detail?.poster_path}`}
                      alt=""
                      className="max-w-100 rounded-xl"
                    />
                  </div>
                  <div className="max-w-[750px] p-12">
                    <div>
                      <p className=" text-6xl">
                        <strong>{detail?.title}</strong>
                      </p>
                      <div className="flex mt-4">
                        <StarIcon className="h-6 me-2 text-yellow-500"></StarIcon>
                        <p>{detail?.vote_average?.toFixed(1)}</p>
                      </div>
                      <p className="mt-4">{detail?.overview}</p>
                      <p className="my-4 text-xl">
                        <strong>Genres</strong>
                      </p>
                      <div className="flex">
                        {detail?.genres?.map((e) => (
                          <div className="p-2 border me-2 rounded-md bg-yellow-600">
                            <p>{e?.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between   mt-5 ">
              <div className="flex justify-center text-center items-center  rounded-xl p-5 w-[20%] m-5 border">
                <p>
                  <strong className="text-xl">Release Date</strong>
                  <p className="text-gray-400 pt-2">{detail?.release_date}</p>
                </p>
              </div>
              <div className="flex justify-center text-center items-center rounded-xl p-5 w-[20%] m-5 border">
                <p>
                  <strong className="text-xl">Popularity</strong>
                  <p className="text-gray-400 pt-2">
                    {detail?.popularity
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </p>
                </p>
              </div>
              <div className="flex flex-col justify-center text-center items-center rounded-xl p-5 w-[20%] m-5 border">
                <p>
                  <strong className="text-xl">Duration</strong>
                </p>
                <p className="text-gray-400 pt-2">{detail?.runtime} minutes</p>
              </div>
              <div className="flex justify-center text-center items-center rounded-xl p-5 w-[20%] m-5 border">
                <p>
                  <strong className="text-xl">Revenue</strong>
                  <p className="text-gray-400 pt-2">
                    {detail?.revenue
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </p>
                </p>
              </div>
              <div className="flex justify-center text-center items-center rounded-xl p-5 w-[20%] m-5 border">
                <p>
                  <strong className="text-xl">Language</strong>
                  <div className="flex flex-wrap justify-center">
                    {detail?.spoken_languages?.map((e) => (
                      <div className="p-2 text-gray-400 flex items-center m-2">
                        <p>{e?.name}</p>
                      </div>
                    ))}
                  </div>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
