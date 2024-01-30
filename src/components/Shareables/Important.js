import React from "react";

function Important({ list }) {
  return (
    <div className="space-y-6">
      {list?.map((item) => {
        return (
          <div
            style={{
              boxShadow:
                "0px 4px 6px -4px rgba(0, 0, 0, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10), 0px 0px 16px 0px rgba(0, 0, 0, 0.05)",
            }}
            className="p-4 flex flex-col relative rounded-lg bg-white"
          >
            <div className="bg-[#D9D9D9] rounded-lg aspect-video w-full" />
            <div className="px-2 flex flex-col space-y-2 mt-3">
              <p className="text-base line-clamp-2 leading-6 font-lato text-black font-medium">
                Community Guidelines
              </p>
              <p className="text-primary-neutral-500 font-lato text-xs font-normal leading-5 tracking-[0.6px]">
                Overview of our community guidelines to ensure a safe working
                environment for everyone
              </p>
            </div>
            <div className="w-9 h-9 absolute top-2 right-2 rounded-full shadow-md flex flex-row items-center justify-center bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
              >
                <path
                  d="M15.4286 12.8573V15.4287H5.14287V12.8573H3.42859V15.4287C3.42859 16.3716 4.20002 17.143 5.14287 17.143H15.4286C16.3714 17.143 17.1429 16.3716 17.1429 15.4287V12.8573H15.4286ZM14.5714 9.42871L13.3629 8.22014L11.1429 10.4316V3.42871H9.42859V10.4316L7.20859 8.22014L6.00002 9.42871L10.2857 13.7144L14.5714 9.42871Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Important;
