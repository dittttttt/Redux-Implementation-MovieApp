import React, { useState } from "react";

export default function Footer() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with input:", input); // Debugging
    if (input.name && input.email && input.message) {
      try {
        const res = await fetch("src/api/contact.js", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        console.log("Response status:", res.status); // Debugging
        if (res.ok) {
          setInput({ name: "", email: "", message: "" });
          console.log("Message sent successfully");
        } else {
          const errorData = await res.json();
          console.log("Failed to send message:", errorData);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex bg-gray-900 min p-12">
      <div className="w-1/3 flex flex-col justify-between">
        <div className="">
          <a href="/" className="text-4xl">
            <strong className="text-yellow-500">PRIME</strong>MOVIES
          </a>
          <p className="text-xl">Find Your Favorite Movie</p>
          <p className="mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            saepe quaerat iure perferendis voluptate qui dolores, cumque
            doloribus excepturi. In praesentium soluta repudiandae inventore
            facere voluptates nemo deserunt molestias dicta.
          </p>
        </div>
        <div className="flex mt-5 gap-2">
          <img src="src/assets/whatsapp.png" className="w-[30px]" />
          <img src="src/assets/social.png" className="w-[30px]" />
          <img src="src/assets/telegram.png" className="w-[30px]" />
          <img src="src/assets/github.png" className="w-[30px]" />
          <img src="src/assets/gmail.png" className="w-[30px]" />
        </div>
      </div>
      <div className="w-1/3 mx-4 flex justify-center ">
        <p className="flex flex-col">
          <strong className="mb-2 text-xl">Pages</strong>
          <a href="/" className="">
            Home
          </a>
          <a href="/top-rated" className="">
            Top Rated
          </a>
          <a href="/popular" className="">
            Popular
          </a>
          <a href="/upcoming" className="">
            Up Coming
          </a>
        </p>
      </div>
      <div className="w-1/3">
        <p className="text-xl">
          <strong>Contact Us</strong>
        </p>
        <div className=" mt-2">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={input.name}
                onChange={handleInput}
                className="text-black rounded-md w-1/2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={input.email}
                onChange={handleInput}
                className="text-black rounded-md w-1/2"
              />
            </div>

            <textarea
              name="message"
              placeholder="Message"
              value={input.message}
              onChange={handleInput}
              className="rounded-md text-black"
              rows="4"
              cols="50"
            ></textarea>
            <div className="flex gap-5 items-center">
              <button
                type="submit"
                className="bg-green-600  w-1/4 text-center rounded-md py-2  border hover:bg-green-700 "
              >
                Send Message
              </button>
              <a>Cancel</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
