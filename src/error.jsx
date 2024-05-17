import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen animate__animated animate__jackInTheBox">
      <img src="/public/assets/404.svg" className="w-[500px]" />
      <button
        className="p-2 border bg-green-400 m-5 hover:bg-green-500 text-white rounded-md"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
    </div>
  );
}
