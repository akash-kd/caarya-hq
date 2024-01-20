import { ArrowRightIcon } from "@heroicons/react/solid";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
const list = [
  {
    image: "/assets/images/essentials/socials/adapt.png",
    name: "Adapt",
    description:
      "The world is transforming at a rapid pace,technologically & jobs, careers are drastically affected with this. People have to adapt in their professions as well, and students have to prepare for this change that is about to come.The following 4 major ways in which Caaryais gearing up to help students:",
  },
  {
    image: "/assets/images/essentials/socials/bare.png",
    name: "Fully Funded Student Initiatives",
    description:
      "The world is transforming at a rapid pace,technologically & jobs, careers are drastically affected with this. People have to adapt in their professions as well, and students have to prepare for this change that is about to come.The following 4 major ways in which Caaryais gearing up to help students:",
  },
  {
    image: "/assets/images/essentials/socials/podcast.png",
    name: "The Student Professional Podcast",
    description:
      "The world is transforming at a rapid pace,technologically & jobs, careers are drastically affected with this. People have to adapt in their professions as well, and students have to prepare for this change that is about to come.The following 4 major ways in which Caaryais gearing up to help students:",
  },
];

const settings = {
  className: "center mx-4 ",
  dots: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
  infinite: true,
};

function AcrossNetwork() {
  return (
    //Home Banner HTML
    <div className="py-8 font-inter w-full mx-auto">
      <div className="pt-6 pb-10 md:pb-0">
        <div className="container px-4 md:px-20 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full justify-center items-center md:items-start text-center md:text-left">
            <h1 className="pt-2 px-6 font-poppins mx-auto mb-12 items-center justify-center text-primary-neutral-800 flex flex-wrap flex-row space-x-2 max-w-full text-2xl md:text-3.5xl font-medium text-center  pb-2 border-b-2 lg:border-b-4 w-max border-primary-red-medium">
              <p>What’s New On </p>
              <span className="text-primary-red-medium">Caarya Social</span>
            </h1>

            <div className="w-full mt-4">
              <Slider
                {...settings}
                prevArrow={
                  <div className="focus:outline-none">
                    <ArrowLeft
                      className="mx-auto left-icon text-primary-red-medium"
                      size={24}
                    />
                  </div>
                }
                nextArrow={
                  <div className="focus:outline-none">
                    <ArrowRight
                      className="mx-auto right-icon icon text-primary-red-medium"
                      size={24}
                    />
                  </div>
                }
              >
                {list?.map((item, index) => {
                  return (
                    <div className="my-5 px-2 md:px-5">
                      <div className="flex flex-col items-start">
                        <img
                          src={item?.image}
                          alt=""
                          className="bg-gray-100 w-full rounded-lg h-56 object-cover"
                          style={{
                            boxShadow:
                              "0px 4px 6px -4px rgba(0, 0, 0, 0.10), 0px 10px 24px -3px rgba(0, 0, 0, 0.10), 0px 0px 16px 0px rgba(0, 0, 0, 0.05)",
                          }}
                        />
                        <div className="flex flex-col items-start px-2 space-y-2 py-4 text-left">
                          <h1 className="text-black text-lg leading-8 font-inter font-semibold">
                            {item?.name}
                          </h1>

                          <p className="leading-5 tracking-[0.7px] text-sm line-clamp-3 font-inter text-primary-neutral-800">
                            The world is transforming at a rapid pace,
                            technologically & jobs, careers are drastically
                          </p>

                          <div className="leading-4 flex flex-row items-center space-x-1 justify-end w-full mt-4 py-2 text-sm font-inter font-semibold text-right text-primary-red-medium">
                            <p className="underline">Read More</p>
                            <ArrowRightIcon className="w-4 h-4 -rotate-45 transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcrossNetwork;
