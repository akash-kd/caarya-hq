import { ArrowRight } from "@phosphor-icons/react";
import BreadCrumb from "components/Comman/BreadCrumb";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const list = [
  {
    name: "What is Caarya",
    path: "/essentials/what",
    image: "/assets/images/essentials/foundation/1.png",
  },
  {
    name: "Caarya for Students",
    path: "/essentials/students",
    image: "/assets/images/essentials/foundation/2.png",
  },
  {
    name: "Caarya for Startups",
    path: "/essentials/startups",
    image: "/assets/images/essentials/foundation/3.png",
  },
  {
    name: "Caarya for Ventures",
    path: "/essentials/ventures",
    image: "/assets/images/essentials/foundation/4.png",
  },
  {
    name: "Our Values",
    path: "/essentials/values",
    image: "/assets/images/essentials/foundation/5.png",
  },
  {
    name: "Caarya Growth Centers (CGCs)",
    path: "/essentials/cgc",
    image: "/assets/images/essentials/foundation/6.png",
  },
  {
    name: "CREWs",
    path: "/essentials/crew",
    image: "/assets/images/essentials/foundation/7.png",
  },
  {
    name: "Topic Clusters",
    path: "/essentials/clusters",
    image: "/assets/images/essentials/foundation/8.png",
  },
  {
    name: "Our Socials",
    path: "/essentials/socials",
    image: "/assets/images/essentials/foundation/9.png",
  },
  {
    name: "Tools and Products",
    path: "/essentials/toolsProducts",
    image: "/assets/images/essentials/foundation/10.png",
  },
];

function FoundationEssentials() {
  const history = useHistory();
  return (
    <>
      <BreadCrumb back page1="Essentials" page2="Foundation Essentials" />
      <div className="px-4 w-full pt-4 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-85vh lg:h-auto overflow-y-auto">
        <div className="py-4 px-5 flex flex-row items-center space-x-5">
          <div className="w-14 h-14 rounded-full text-primary-neutral-800 font-lato text-xl font-bold leading-9 flex flex-row items-center justify-center border-[3px] border-[#C44EB9]">
            0.0
          </div>
          <div className="flex flex-col space-y-1 w-9/12">
            <h1 className="text-black font-lato text-base font-semibold leading-6">
              Your KYC Score
            </h1>
            <p className="text-primary-neutral-800 font-lato text-2xs font-light leading-4">
              Short description of what this is supposed to be & how to increase
              it
            </p>
          </div>
        </div>
        {list?.map((item) => {
          return (
            <div className="">
              <div
                style={{
                  boxShadow:
                    "0px 4px 6px -4px rgba(0, 0, 0, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10), 0px 0px 16px 0px rgba(0, 0, 0, 0.05)",
                }}
                className="relative cursor-pointer bg-white hover:bg-primary-neutral-100 p-4 rounded-xl w-full flex flex-row items-center justify-between space-x-6"
              >
                <img
                  src={item?.image}
                  alt=""
                  className="w-20 h-20 object-cover"
                />
                <div className="flex flex-col space-y-2 w-10/12">
                  <h1 className="z-20 text-black font-satoshi text-base leading-6 font-bold">
                    {item?.name}
                  </h1>
                  <div className="flex flex-row items-center space-x-2 text-primary-neutral-500 font-lato text-2xs font-medium leading-4">
                    <p className="">2 min read</p>
                    <p className=""></p>
                    <p className="flex flex-row items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M12.6667 2H3.33333C2.6 2 2 2.6 2 3.33333V12.6667C2 13.4 2.6 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V3.33333C14 2.6 13.4 2 12.6667 2ZM12.6667 12.6667H3.33333V3.33333H12.6667V12.6667ZM4.66667 6.66667H6V11.3333H4.66667V6.66667ZM7.33333 4.66667H8.66667V11.3333H7.33333V4.66667ZM10 8.66667H11.3333V11.3333H10V8.66667Z"
                          fill="#816FE9"
                        />
                      </svg>
                      <p>Assessment</p>
                    </p>
                  </div>
                  <p
                    className={`flex flex-row justify-end items-end text-primary-error-500`}
                  >
                    <ArrowRight
                      onClick={() => {
                        item?.path && history.push(item?.path);
                      }}
                      size={24}
                    />
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FoundationEssentials;
