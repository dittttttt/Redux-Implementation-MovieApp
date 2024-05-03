import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleLogin from "./googleLogin";

export default function login() {
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setIsEmailEmpty(true);
      toast.error("Please enter your email");
      return;
    }
    if (!password.trim()) {
      setIsPasswordEmpty(true);
      toast.error("Please enter your password");
      return;
    }
    getData();
  };

  useEffect(() => {
    token ? navigate("/") : "";
  }, []);

  async function getData() {
    try {
      if (email.trim() && password.trim()) {
        const response = await axios.post(
          "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
          {
            email,
            password,
          }
        );

        console.log("data token", response);
        if (response.status === 200) {
          localStorage.setItem("token", response.data.data.token);
          navigate("/");
        } else {
          alert("User not registered");
        }
      } else {
        if (!email.trim()) setIsEmailNull(false);
        if (!password.trim()) setIsUserPasswordNull(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Email or Password is not valid");
    }
  }
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="text-white flex justify-center items-center h-screen p-5">
      <ToastContainer />
      <div>
        <div className="mb-7 text-center">
          <p className="text-4xl">
            <strong className="text-yellow-500">PRIME</strong>MOVIES
          </p>
          <p>Find Your Favorite Movie </p>
        </div>
        <div className="border rounded-md bg-gray-700">
          <div className="flex flex-col p-5">
            <button
              className=" text-start underline hover:text-yellow-600 text-yellow-500"
              onClick={(e) => {
                navigate("/");
              }}
            >
              Home
            </button>
            <p className="text-3xl text-center px-5 ">Login</p>
            <p className="text-center pb-5">Input your email and password</p>
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col">
                <div
                  className={`flex flex-col  ${
                    isEmailEmpty && "border-red-500"
                  }`}
                >
                  <label>
                    <span>Email</span>
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsEmailEmpty(false);
                    }}
                    name="email"
                    placeholder="Email"
                    className={`py-2 px-5 rounded-md text-black ${
                      isEmailEmpty && "border-2 border-red-500"
                    }`}
                  />
                </div>
                <div
                  className={`flex flex-col my-3 ${
                    isPasswordEmpty && "border-red-500"
                  }`}
                >
                  <label>
                    <span>Password</span>
                  </label>
                  <div className="flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      placeholder="Password"
                      className="py-2 px-5 rounded-md text-black border border-gray-300 focus:outline-none focus:border-yellow-500"
                    />
                    <button
                      type="button"
                      onClick={handleTogglePassword}
                      className="ml-2 px-3 py-1 rounded-md bg-gray-200 text-white hover:bg-gray-300 focus:outline-none"
                    >
                      {showPassword ? (
                        <img src="/src/assets/view.png" className="w-4 py-2" />
                      ) : (
                        <img src="/src/assets/eye.png" className="w-4 py-2" />
                      )}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="p-2 my-3 border bg-yellow-600 hover:bg-yellow-700"
                >
                  Sign In
                </button>
              </form>
              <div className="flex items-center justify-center my-4">
                <div className="border-t border-white w-full"></div>
                <p className="text-white mx-3">OR</p>
                <div className="border-t border-white w-full"></div>
              </div>
            </div>
            <GoogleLogin buttonText="Google login" />
            <hr className="mt-5" />
            <p className="mt-2 text-center text-sm  text-gray-400">
              Don’t you have an account?
              <span>
                <a
                  href="/register"
                  className="ms-1 text-yellow-400 hover:text-yellow-600"
                >
                  Sign Up
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
