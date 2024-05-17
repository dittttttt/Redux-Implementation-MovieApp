import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastToggle } from "flowbite-react";

function Register() {
  const token = localStorage.getItem("token");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    token ? navigate("/") : "";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    //validasi required
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    //validasi long charachter
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    //validasi capital
    if (!/[A-Z]/.test(password.charAt(0))) {
      toast.error("Password must start with a capital letter");
      return;
    }

    //validasi number
    if (!/\d/.test(password)) {
      toast.error("Password must contain at least one digit");
      return;
    }

    try {
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
        formData
      );
      toast.success("Registrasion Successful");
      // console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="text-white flex justify-center items-center h-screen ">
      <div className="flex p-2">
        <div className="flex-1 bg-blue-900 bg-[url('src/assets/bglogin.svg')] text-white flex flex-col rounded-l-xl justify-center items-center w-1/2 p-6">
          <img src="/public/assets/assetregist.svg" className="w-[250px] mb-5" />
          <div className="text-center">
            <h1 className="text-2xl mb-2">Nice to see you today</h1>
            <h2 className="text-4xl mb-4">
              Find your <br></br>Favorite Movies
            </h2>
            <p className="max-w-md text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="border p-6 w-1/2 bg-white flex rounded-r-xl items-center justify-center">
          <div>
            <div className="mb-7 text-center ">
              <p className="text-4xl text-black">
                <strong className="text-yellow-500">PRIME</strong>MOVIES
              </p>
              <p className="text-black ">Find Your Favorite Movie </p>
            </div>
            <div className=" bg-white">
              <div className="flex flex-col p-5">
                <div>
                  <button
                    className="text-start underline hover:text-yellow-600 text-yellow-500"
                    onClick={(e) => {
                      navigate("/");
                    }}
                  >
                    Home
                  </button>
                </div>
                <p className="text-3xl text-center px-5 text-black">Register</p>
                <p className="text-center pb-5 text-black">
                  Lorem ipsum dolor, sit amet consectetur
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <div className="flex flex-col">
                    <label>
                      <span>Username</span>
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      name="name"
                      placeholder="Username"
                      className="py-2 px-5 rounded-md text-black"
                    />
                  </div>
                  <div className="flex flex-col mt-3">
                    <label>
                      <span>Email</span>
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      name="email"
                      placeholder="Email"
                      className="py-2 px-5 rounded-md text-black"
                    />
                  </div>
                  <div className="flex flex-col my-3">
                    <label>
                      <span>Password</span>
                    </label>
                    <div className="flex">
                      <input
                        type={showPassword ? "text" : "password"}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        name="password"
                        placeholder="Password"
                        className="py-[8px] px-5 w-full rounded-l-md text-black border border-gray-300 "
                        style={{ borderRight: "none" }}
                      />
                      <button
                        type="button"
                        onClick={handleTogglePassword}
                        className="flex justify-end px-3 py-[5px] rounded-r-lg border bg-white text-white "
                        style={{ borderLeft: "none" }}
                      >
                        {showPassword ? (
                          <img
                            src="/public/assets/view.png"
                            className="w-4 py-2"
                          />
                        ) : (
                          <img src="/public/assets/eye.png" className="w-4 py-2" />
                        )}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="p-2 my-3 rounded-md bg-blue-600 hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </form>
                <hr className="my-5" />
                <p className="text-center text-gray-400">
                  Already have an account?
                  <span>
                    <a
                      href="/login"
                      className="ms-1 text-yellow-500 hover:text-yellow-600"
                    >
                      Click here
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
