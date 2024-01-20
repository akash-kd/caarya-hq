import React from "react";
import Slider from "react-slick";
import CityCard from "./CityCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardCarousel = ({ title, data }) => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.25,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-16">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-8 h-8 rounded-full bg-[#D9D9D9]" />
        <h1 className="text-center font-poppins text-2xl font-medium explore-cgcs-carousel-title">
          {title}
        </h1>
      </div>
      <Slider {...settings} className="items-center">
        {data.map((item) => {
          return <CityCard source={item.source} city={item.city} />;
        })}
      </Slider>
    </div>
  );
};

export default CardCarousel;
