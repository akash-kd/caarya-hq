/**
 * Profile Card Loader Component displayed while data is being fetched
 * @returns
 */

import { DefaultAvatar } from "helpers/utils/common/icons";

function ProfileCardV2Loader() {
  return (
    <>
      <div className="members-card max-w-md w-full mx-auto relative">
        <div
          className={`bg-circle yellow absolute top-0 left-0 h-full w-1/2`}
        />
        <div className="w-full p-4 flex flex-row items-stretch space-x-3 relative">
          <div className="w-16 h-16 bg-white rounded-full p-1.5">
            <img
              className="w-full h-full bg-primary-gray-300 rounded-full flex-shrink-0 object-cover "
              src={DefaultAvatar}
              alt=""
            />
          </div>

          <div className="w-3/4 flex flex-row items-center space-x-2">
            <div className="w-11/12">
              <h3 className="text-sm font-bold bg-gray-100 w-8/12 h-4 rounded truncate font-karla leading-4"></h3>

              <div className="flex flex-row items-center mt-0.5 ">
                <img
                  src="/assets/images/icons/university.svg"
                  alt=""
                  className="w-3 h-3 mr-1"
                />
                <p className="bg-gray-100 w-8/12 h-3 rounded break-all text-2xs font-lato font-normal  leading-6"></p>
              </div>
              <div className="mt-0.5 flex flex-row items-center w-full">
                <img
                  src="/assets/images/icons/rank.svg"
                  alt=""
                  className="w-3 h-3 mt-0.5 mr-1"
                />
                <p className="bg-gray-100 w-8/12 h-3 rounded break-all text-2xs font-lato font-normal  leading-6"></p>
              </div>
            </div>
            <div className="flex flex-row items-center h-full"></div>
          </div>
        </div>
      </div>
      {/* <div className="profile-card max-w-sm w-full p-3 mx-auto">
        <div className="w-full px-1 flex items-center justify-between animate-pulse space-x-6">
          <div className="w-full flex items-center justify-between space-x-6 cards-profilecards-loader-div1">
            <div className="flex-1 truncate">
              <p className="font-normal truncate text-2xs font-lato h-4 w-28 rounded bg-red-100 cards-profilecards-loader-para"></p>

              <div className="flex items-center space-x-3 mt-2">
                <h3 className="text-sm font-bold bg-gray-100 w-8/12 h-4 rounded truncate font-karla leading-4"></h3>
              </div>
              <div className="flex flex-row items-center mt-2.5 ">
                <img
                  src="/assets/images/icons/university.svg"
                  alt=""
                  className="w-3 h-3 mr-1"
                />
                <p className="text-primary-gray-600 bg-gray-100 w-8/12 h-3 rounded text-2xs line-clamp-2 font-lato font-normal leading-6"></p>
              </div>
              <div className="mt-1.5 flex flex-row items-center w-full">
                <img
                  src="/assets/images/icons/rank.svg"
                  alt=""
                  className="w-3 h-3 mt-0.5 mr-1"
                />
                <p className="bg-gray-100 w-8/12 h-3 rounded break-all text-2xs font-lato font-normal  leading-6"></p>
              </div>
            </div>

            <div className="w-16 h-16 bg-gray-100 rounded-full flex-shrink-0 object-cover " />
          </div>
        </div>

        <div className="mt-6 flex flex-row items-center space-x-8 justify-between animate-pulse">
          <div
            className={`font-lato text-sm font-bold flex flex-row items-center w-6/12 h-9 leading-4 py-2.5 px-3.5 cursor-pointer text-primary-gray-350 cards-profilecards-loader-div2`}
          ></div>

          <div
            className={`font-lato text-sm flex flex-row items-center leading-4 w-6/12 h-9 py-2.5 px-3.5 cursor-pointer text-white font-bold bg-primary-indigo-300 .cards-profilecards-loader-div3`}
          ></div>
        </div>
      </div> */}
    </>
  );
}

export default ProfileCardV2Loader;
