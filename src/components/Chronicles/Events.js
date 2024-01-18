import EmptyState from "components/Comman/EmptyState";
import React from "react";

function EventsChronicles({ list }) {
  return (
    <div className="flex flex-col items-stretch">
      {list?.length > 0 ? (
        list?.map((item) => {
          return (
            <div className="py-4 px-2 border-b border-primary-neutral-300 flex flex-col items-stretch space-y-3">
              <div className="w-full min-h-[200px] rounded-lg bg-primary-gray-80">
                <img
                  src={item?.eventGraphic?.url}
                  alt=""
                  className="w-full rounded-lg object-cover"
                />
              </div>
              <div className="px-4 py-1 max-w-max rounded-full bg-primary-green-100 text-primary-green-medium font-lato text-2xs font-semibold">
                Event Conducted
              </div>
              <div className="text-primary-gray-800 font-lato text-sm font-light">
                {item?.description}
              </div>
            </div>
          );
        })
      ) : (
        <EmptyState
          svg={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="121"
              viewBox="0 0 120 121"
              fill="none"
            >
              <path
                d="M71.186 61.878C69.5063 60.1973 66.9058 60.2383 65.2661 61.878L60.0259 67.1182L54.7856 61.878C53.146 60.2383 50.4263 60.2383 48.7856 61.878C47.1337 63.6127 47.2422 66.2573 48.7856 67.878L54.0259 73.1182L48.8257 78.3184C47.9858 79.1583 47.5859 80.1973 47.5859 81.2774C47.5859 82.3184 47.9858 83.4376 48.8257 84.2774C50.4663 85.918 53.106 85.918 54.7461 84.2774L59.9858 79.0381L65.2261 84.2774C66.8657 85.918 69.5063 85.918 71.146 84.2774C72.8257 82.6377 72.8257 79.9581 71.186 78.3184L65.9458 73.0782L71.186 67.8379C72.8257 66.1973 72.8257 63.5176 71.186 61.878Z"
                fill="currentColor"
                fill-opacity="0.5"
              />
              <path
                d="M98.3599 17.5766H96.7603C96.7603 18.1763 96.7603 28.0612 96.7603 27.6566C96.7603 34.2567 91.3999 39.6566 84.7603 39.6566C78.1597 39.6566 72.7603 34.2567 72.7603 27.6566C72.7603 25.8726 72.7603 17.1658 72.7603 17.5766H47.2397V25.5766V27.6566C47.2397 34.2567 41.8398 39.6566 35.2397 39.6566C28.6001 39.6566 23.2397 34.2567 23.2397 27.6566C23.2397 25.8726 23.2397 17.1658 23.2397 17.5766H21.6401C14.1196 17.5766 8 23.6967 8 31.2167V43.6967V95.8568C8 103.376 14.1196 109.496 21.6401 109.496H98.3599C105.88 109.496 112 103.376 112 95.8568V43.6967V31.2167C112 23.6967 105.88 17.5766 98.3599 17.5766ZM98.3599 101.496H21.6401C18.52 101.496 16 98.977 16 95.8568V47.6967H104V95.8568C104 98.977 101.48 101.496 98.3599 101.496Z"
                fill="currentColor"
                fill-opacity="0.5"
              />
              <path
                d="M35.2285 31.6445C37.4375 31.6445 39.2285 29.8555 39.2285 27.6445V15.5C39.2285 13.2891 37.4375 11.5 35.2285 11.5C33.0195 11.5 31.2285 13.2891 31.2285 15.5V27.6445C31.2285 29.8555 33.0195 31.6445 35.2285 31.6445Z"
                fill="currentColor"
                fill-opacity="0.5"
              />
              <path
                d="M84.7656 31.6445C86.9746 31.6445 88.7656 29.8555 88.7656 27.6445V15.5C88.7656 13.2891 86.9746 11.5 84.7656 11.5C82.5566 11.5 80.7656 13.2891 80.7656 15.5V27.6445C80.7656 29.8555 82.5566 31.6445 84.7656 31.6445Z"
                fill="currentColor"
                fill-opacity="0.5"
              />
            </svg>
          }
          text="No Event Updates found!"
        />
      )}
    </div>
  );
}

export default EventsChronicles;
