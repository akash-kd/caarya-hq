import { ChronPageHeader } from "components/Chron";
import Breadcrumbs from "components/Comman/BreadCrumb";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllChron } from "config/APIs/chron";
import { useState } from "react";
import moment from "moment";


function Chronicles() {
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetch() {
      const res = await getAllChron();
      setData(res.data.chrons);
    }

    fetch();
  }, []);


  return (
    <div>
      <Breadcrumbs page1="Chronicles" dark />
      <div className="overflow-scroll min-h-85vh h-[85vh] bg-dark-bg">
        <ChronPageHeader heading="Caarya Daily Chronicles" />

        <div className="flex flex-col gap-[16px] p-[16px] relative bg-[#ffffff0d] my-10">
          <div className="w-full font-satoshi font-medium text-white text-[14px] tracking-[0.28px] leading-[21px] whitespace-nowrap">
            Company Updates
          </div>
          <div className="flex overflow-scroll items-center gap-[20px]">
            <div className="flex flex-col min-w-[240px] w-[240px] h-[200px] items-start gap-[8px] p-[12px] bg-[#ffffff33] rounded-[10px]">
              <p className="relative self-stretch mt-[-1.00px] [font-family:'Lato-Regular',Helvetica] font-normal text-neutral-100 text-[12px] tracking-[0.24px] leading-[18px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                Update text here in two lines lorem ipsum 😄🔥
              </p>
              <div className="relative flex-1 self-stretch w-full grow bg-[#d9d9d9] rounded-[4px]" />
            </div>
            <div className="flex flex-col min-w-[240px] w-[240px] h-[200px] items-start gap-[8px] p-[12px] bg-[#ffffff33] rounded-[10px]">
              <p className="relative self-stretch mt-[-1.00px] [font-family:'Lato-Regular',Helvetica] font-normal text-neutral-100 text-[12px] tracking-[0.24px] leading-[18px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                Update text here in two lines lorem ipsum 😄🔥
              </p>
              <div className="relative flex-1 self-stretch w-full grow bg-[#d9d9d9] rounded-[4px]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-[40px] px-[24px] py-[16px] mb-20">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col min-h-[80px] items-start gap-[16px] p-[16px] self-stretch w-full bg-[#ffffff33] rounded-[10px] relative flex-[0_0_auto]"
              >
                <div className="inline-flex items-center gap-[12px] relative flex-[0_0_auto]">
                  <img
                    className="relative w-[28px] h-[28px] object-cover bg-blue-500 rounded-full"
                    alt="A"
                    src="image.png"
                  />
                  <div className="relative w-fit [font-family:'Lato-Bold',Helvetica] font-bold text-neutral-100 text-[14px] tracking-[0.70px] leading-[21px] whitespace-nowrap">
                    {item.full_name || "Darlene Robertson"}
                  </div>
                </div>
                <p className="relative self-stretch [font-family:'Lato-Regular',Helvetica] font-normal text-neutral-100 text-[14px] tracking-[0.70px] leading-[21px]">
                  {item.message}
                </p>
                <div className="relative self-stretch w-full h-[160px] bg-[#d9d9d9] rounded-[4px]" />
                <div className="flex items-center justify-between self-stretch w-full relative flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-[8px] relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Lato-SemiBold',Helvetica] font-semibold text-neutral-100 text-[10px] tracking-[0.25px] leading-[15px] whitespace-nowrap">
                      Illustrator
                    </div>
                  </div>
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Lato-Light',Helvetica] font-light text-neutral-100 text-[10px] tracking-[0.25px] leading-[15px] whitespace-nowrap">
                    {moment(item.createdAt).format("hh:mm A")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {
        // Add Chronicle
        <div
          onClick={() => {
            history.push("/chron/add");
          }}
          className="flex justify-end items-center w-full h-20 relative top-[-112px] px-4 py-4"
        >
          <div className="fixed cursor-pointer flex justify-center items-center gap-2 p-4 red-gradient rounded-2xl">
            {/* This is a Add Icon */}
            <image src="/assets/svg/chron/add.svg" alt="Add Icon" />
            <h3 className="font-lato text-white">Add Chronicle</h3>
          </div>
        </div>
      }
    </div>
  );
}

export default Chronicles;
