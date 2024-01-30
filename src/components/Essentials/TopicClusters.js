import EmptyState from "components/Comman/EmptyState";
import { useState, useEffect } from "react";
import * as MarketingAPI from "config/APIs/marketing";
import BreadCrumb from "components/Comman/BreadCrumb";
import Header from "./Header";
import { topicClusters } from "helpers/constants/topicClusters";

function TopicClusters() {
  return (
    <>
      <BreadCrumb
        back
        page1="Essentials"
        page2="Foundation Essentials"
        page3="Topic Clusters"
      />{" "}
      <div className="px-5 py-10 lg:p-20 h-[80vh] overflow-y-auto">
        <div className="w-full flex flex-col items-center justify-center space-y-2 lg:space-y-4">
          <Header
            name="Topic Clusters"
            image="/assets/images/essentials/foundation/8.png"
          />

          <div className="w-full max-w-[100vw] z-20 flex flex-row items-center justify-center">
            <h4 className="text-2xl md:text-[32px] font-normal tracking-[2.4px] lg:tracking-[3.2px] lg:leading-[48px] text-black text-center font-satoshi leading-9 w-max">
              What Are Topic Clusters?
            </h4>
          </div>

          <div className="w-full mt-6 max-w-[100vw] z-20 flex flex-row items-center text-left justify-center">
            <h4 className="text-sm font-light lg:text-base leading-6 tracking-[0.35px] text-primary-neutral-500 text-left font-lato max-w-4xl capitalize">
              Some explanation of what topic clusters are lorem ipsum dolor sit{" "}
            </h4>
          </div>
        </div>

        <div className="space-y-8 mt-20">
          <h1 className="w-full text-center text-black font-satoshi text-2xl font-normal leading-9 tracking-[2.4px]">
            Explore Topic Clusters
          </h1>{" "}
          <div className="py-4 px-2 grid gap-6">
            {topicClusters.map((item, index) => {
              return (
                <div
                  style={{
                    boxShadow:
                      "0px 4px 6px -4px rgba(0, 0, 0, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
                  }}
                  className="p-4 bg-white rounded-lg flex flex-row items-center justify-between w-full"
                >
                  <div className="space-y-1 w-10/12 pr-4">
                    <h1 className="font-lato break-words font-bold text-sm text-black leading-5">
                      {item?.name || item?.type}
                    </h1>
                    {item?.platform && (
                      <p className="font-lato font-normal text-2xs text-primary-neutral-800 leading-4">
                        {item?.platform}
                      </p>
                    )}
                    {item?.description && (
                      <p className="font-lato font-normal text-2xs text-primary-neutral-800 leading-4">
                        {item?.description}
                      </p>
                    )}
                  </div>
                  <img
                    className={`h-14 w-14 object-cover ${
                      item?.image?.url && "rounded-lg"
                    }`}
                    src={
                      (item?.image && item.image.url) ||
                      "/assets/images/emptystates/projectcover.svg"
                    }
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default TopicClusters;
