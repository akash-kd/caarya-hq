import { useState, useEffect } from "react";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchBox from "components/Comman/Inputs/SearchBox";
import EmptyState from "components/Comman/EmptyState";
import ShortURLsCard, { ShortUrlLoader } from "components/Learning/Card";
import * as ShortUrlAPI from "config/APIs/shortUrls";
import BreadCrumb from "components/Comman/BreadCrumb";

function Learning() {
  var settings = {
    dots: false,
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
  const [fetching, setFetching] = useState(false);
  const [shortUrls, setShortUrls] = useState([]);
  const [search, setSearch] = useState({
    searchText: "",
    isSearch: false,
  });

  const fetchAllShortUrls = async () => {
    setFetching(true);
    try {
      const response = await ShortUrlAPI.findAll({
        exclude: JSON.stringify(["Kits", "FYI", "Locker"]),
      });
      let newLinks = response.data.data.response;
      setShortUrls(newLinks);
    } catch (err) {
      console.log(err);
    }
    setFetching(false);
  };
  useEffect(() => fetchAllShortUrls(), []);

  return (
    <>
      <BreadCrumb back page1="Essentials" page2="Knowledge Boosters" />
      <div className=" w-full pt-4 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 h-85vh lg:h-auto overflow-y-auto">
        <div className="px-4 w-full flex flex-col space-y-10">
          <div className="py-4 px-5 flex flex-row items-center space-x-5">
            <div className="w-14 h-14 rounded-full text-primary-neutral-800 font-lato text-xl font-bold leading-9 flex flex-row items-center justify-center border-[3px] border-[#816FE9]">
              0.0
            </div>
            <div className="flex flex-col space-y-1 w-9/12">
              <h1 className="text-black font-lato text-base font-semibold leading-6">
                Learning Boost For The Week
              </h1>
              <p className="text-primary-neutral-800 font-lato text-2xs font-light leading-4">
                Short description of what this is supposed to be & how to
                increase it
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <SearchBox
              placeholder="Start typing to find..."
              search={search}
              setSearch={setSearch}
            />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="px-4 text-black text-base font-satoshi font-medium leading-6 tracking-[0.32px]">
            Recommended For You
          </h1>
          <div className="px-4 py-6 bg-primary-neutral-50">
            {!fetching ? (
              shortUrls?.length > 0 ? (
                <Slider {...settings} className="items-center">
                  {shortUrls.map((item) => {
                    if (
                      !search?.searchText ||
                      (search?.searchText &&
                        item?.title
                          ?.toLowerCase()
                          ?.includes(search?.searchText?.toLowerCase()))
                    )
                      <div className="pr-4">
                        <ShortURLsCard {...item} onClick={() => {}} />{" "}
                      </div>;
                  })}
                </Slider>
              ) : (
                <EmptyState />
              )
            ) : (
              <>
                {[1, 2, 3, 4, 5, 6].map((item) => {
                  return <ShortUrlLoader {...item} />;
                })}
              </>
            )}{" "}
          </div>
        </div>
        <div className="space-y-4 px-4">
          <h1 className="text-black text-base font-satoshi font-medium leading-6 tracking-[0.32px]">
            All Knowledge Boosters
          </h1>
          <div className="py-4 px-2 bg-primary-neutral-50 flex flex-col space-y-6">
            {!fetching ? (
              shortUrls?.length > 0 ? (
                shortUrls.map((item) => {
                  if (
                    !search?.searchText ||
                    (search?.searchText &&
                      item?.title
                        ?.toLowerCase()
                        ?.includes(search?.searchText?.toLowerCase()))
                  )
                    return <ShortURLsCard {...item} onClick={() => {}} />;
                })
              ) : (
                <EmptyState />
              )
            ) : (
              <>
                {[1, 2, 3, 4, 5, 6].map((item) => {
                  return <ShortUrlLoader {...item} />;
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Learning;
