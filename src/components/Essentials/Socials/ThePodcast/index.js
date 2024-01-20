import React from "react";

function ThePodcast() {
  return (
    <div className="bg-[#0E3963]">
      <div className="container px-6 py-20 md:px-3 mx-auto flex flex-col items-center justify-center lg:flex-row lg:space-x-10 space-y-10 lg:space-y-0">
        <img
          src="/assets/images/essentials/socials/podcast.png"
          alt=""
          className="object-contain"
        />

        <div className="flex flex-col w-full lg:w-1/2 items-start py-6 space-y-10">
          <div className="flex flex-row items-stretch space-x-6">
            <img
              src="/assets/images/essentials/socials/logo.png"
              alt=""
              className="object-contain"
            />
            <div className="h-[72px] w-0.5 bg-white" />
            <div className="text-white font-poppins text-xl font-medium flex flex-row items-center">
              Episode 2
            </div>
          </div>
          <div className="flex flex-col space-y-2 font-poppins text-[32px] font-semibold">
            <p className="text-primary-fusion-500">
              Field to Classroom, a winning Combnation
            </p>
            <p className="text-white">with Yashvi & Avishka</p>
          </div>

          <p className="text-white font-inter text-base font-light">
            <span className="font-semibold">The Student Professional</span>{" "}
            podcast presents Episode 2: Yashvi's Insights on Balancing Sports
            and Academics!
            <br />
            <br />
            Join us to learn how <span className="font-semibold">
              Yashvi
            </span>{" "}
            effectively manages her time and excels in both areas. This episode
            is a must-listen for aspiring student athletes. Discover practical
            tips for achieving success in academics and sports without
            compromise.
          </p>

          <a
            href="https://open.spotify.com/show/2fvlhIHdHxzKt8XHvcrZVW"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer flex flex-row items-center bg-[#1ED760] rounded-full px-8 py-4 space-x-2 text-black inter text-base font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.55 2 12 2ZM15.75 16.65C13.4 15.2 10.45 14.9 6.95 15.7C6.6 15.8 6.3 15.55 6.2 15.25C6.1 14.9 6.35 14.6 6.65 14.5C10.45 13.65 13.75 14 16.35 15.6C16.7 15.75 16.75 16.15 16.6 16.45C16.4 16.75 16.05 16.85 15.75 16.65ZM16.75 13.95C14.05 12.3 9.95 11.8 6.8 12.8C6.4 12.9 5.95 12.7 5.85 12.3C5.75 11.9 5.95 11.45 6.35 11.35C10 10.25 14.5 10.8 17.6 12.7C17.9 12.85 18.05 13.35 17.8 13.7C17.55 14.05 17.1 14.2 16.75 13.95ZM6.3 9.75C5.8 9.9 5.3 9.6 5.15 9.15C5 8.65 5.3 8.15 5.75 8C9.3 6.95 15.15 7.15 18.85 9.35C19.3 9.6 19.45 10.2 19.2 10.65C18.95 11 18.35 11.15 17.9 10.9C14.7 9 9.35 8.8 6.3 9.75Z"
                fill="black"
              />
            </svg>{" "}
            <p>Listen On Spotify</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ThePodcast;
