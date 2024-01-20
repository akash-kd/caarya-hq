import { Link } from "react-router-dom";

function CuriousProLatest() {
  return (
    <div className="bg-[#edffff] p-6 sm:p-16 mb-16">
      <div className="container px-6  mx-auto">
        <div className="items-center md:flex">
          <div className="w-full md:w-1/2 hidden md:block">
            <img
              className="w-full h-80 max-w-2xl mt-20 mb-20 rounded-xl object-cover"
              src="/assets/images/essentials/socials/tcpchapterone.png"
              alt=""
            />
          </div>
          <div className="max-w-lg flex flex-col justify-center ml-0 md:ml-10 w-full md:w-1/2 mt-10 md:mt-0  ">
            <h4 className="font-poppins text-sm font-medium text-primary-peddle-500 uppercase  md:text-base mt-12 lg:mt-0">
              THE CURIOUS PRO | Chapter 1
            </h4>
            <h1 className="font-poppins mt-4 text-2xl font-medium text-primary-red-medium  md:text-[32px]">
              Striking a Chord
            </h1>
            <div className="w-full md:w-1/2 highlight-img mt-10 sm:hidden">
              <img
                className="w-full max-w-2xl h-40 rounded-xl object-cover"
                src="/assets/images/essentials/socials/tcpchapterone.png"
                alt=""
              />
            </div>

            <p className="font-inter mt-2 text-black font-light">
              I was nothing but the king of chaos when it came to organization
              or work, the clock would always make me cry and often chase me
              into nightmares as procrastination was my second nature. Back
              then, you would often find me in my room full of scattered books
              as I would run around to search for my phone ringing to Ed
              Sheeran's 'Shape of You'.
            </p>
            <Link
              to="/thecuriouspro"
              className="self-center mt-8 md:self-start"
            >
              <button className="getProfiledBtn font-poppins font-semibold text-sm leading-5">
                Download{" "}
                <svg
                  className="w-5 h-5 ml-2.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.59961 20.4C3.59961 20.0818 3.72604 19.7765 3.95108 19.5515C4.17612 19.3265 4.48135 19.2 4.79961 19.2H19.1996C19.5179 19.2 19.8231 19.3265 20.0481 19.5515C20.2732 19.7765 20.3996 20.0818 20.3996 20.4C20.3996 20.7183 20.2732 21.0235 20.0481 21.2486C19.8231 21.4736 19.5179 21.6 19.1996 21.6H4.79961C4.48135 21.6 4.17612 21.4736 3.95108 21.2486C3.72604 21.0235 3.59961 20.7183 3.59961 20.4ZM7.55121 11.1516C7.77624 10.9267 8.08141 10.8003 8.39961 10.8003C8.71781 10.8003 9.02298 10.9267 9.24801 11.1516L10.7996 12.7032V3.60002C10.7996 3.28176 10.926 2.97654 11.1511 2.7515C11.3761 2.52645 11.6813 2.40002 11.9996 2.40002C12.3179 2.40002 12.6231 2.52645 12.8481 2.7515C13.0732 2.97654 13.1996 3.28176 13.1996 3.60002V12.7032L14.7512 11.1516C14.8619 11.037 14.9943 10.9456 15.1407 10.8827C15.2871 10.8198 15.4446 10.7867 15.6039 10.7853C15.7633 10.7839 15.9213 10.8143 16.0688 10.8746C16.2162 10.935 16.3502 11.0241 16.4629 11.1368C16.5756 11.2494 16.6647 11.3834 16.725 11.5309C16.7853 11.6784 16.8157 11.8364 16.8143 11.9957C16.8129 12.155 16.7798 12.3125 16.7169 12.4589C16.654 12.6053 16.5626 12.7377 16.448 12.8484L12.848 16.4484C12.623 16.6734 12.3178 16.7998 11.9996 16.7998C11.6814 16.7998 11.3762 16.6734 11.1512 16.4484L7.55121 12.8484C7.32624 12.6234 7.19987 12.3182 7.19987 12C7.19987 11.6818 7.32624 11.3767 7.55121 11.1516Z"
                    fill="#363430"
                  />
                </svg>
              </button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CuriousProLatest;
