import React, { useState } from "react";
import BreadCrumb from "components/Comman/BreadCrumb";
import PageHeader from "components/Comman/PageHeader";
import Tabs from "components/Comman/Tabs";

const tabs = [
  { label: "All Issues", value: "all" },
  { label: "My Issues", value: "my" },
];
function Better() {
  const [selectedTab, setSelectedTab] = useState("kits");
  return (
    <>
      <BreadCrumb back page1="Essentials" page2="Lets Make Us Better" />{" "}
      <div className="px-4 py-8 lg:p-20 h-[80vh] overflow-y-auto">
        <div className="w-full flex flex-col items-center justify-center space-y-6">
          <PageHeader
            heading="Lets Make Us Better"
            description="Agree or disagree with what others feel are issues within Caarya. Or, write about what you feel is going wrong or can be improved in Caarya."
          />
          <Tabs
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <div className="py-4 px-2 space-y-6">
            {[1, 2, 3, 4, 5]?.map((item) => {
              return (
                <div
                  style={{
                    boxShadow:
                      "0px 4px 6px -4px rgba(0, 0, 0, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10), 0px 0px 16px 0px rgba(0, 0, 0, 0.05)",
                  }}
                  className="bg-white rounded-xl p-4 space-y-4"
                >
                  <div className="space-y-2">
                    <h1 className="text-black font-lato text-base font-bold leading-6 tracking-[1.28px]">
                      Issue Title Here
                    </h1>
                    <p className="text-primary-neutral-800 font-lato text-sm font-light leading-6 tracking-[0.28px]">
                      Issue description here lorem ipsum dolor sit amet,
                      consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore{" "}
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row space-x-2 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 0.625L0.625 10H6.25V20H13.75V10H19.375L10 0.625Z"
                          fill="#ED4C41"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M13.25 10V10.5H13.75H18.1679L10 18.6679L1.83211 10.5H6.25H6.75V10V0.5H13.25V10Z"
                          stroke="#CFCDC9"
                        />
                      </svg>
                    </div>
                    <p className="text-primary-neutral-400 font-lato text-3xs font-bold leading-3 tracking-[0.16px]">
                      Jan 21, 2023
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Better;
