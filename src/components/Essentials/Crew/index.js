import BreadCrumb from "components/Comman/BreadCrumb";
import Header from "../Header";
import { useState } from "react";
import { wojtek, yoshi, moko, cherAmi } from "helpers/constants/city";
import CityCard from "../CGC/CityCard";

function Crew() {
  const [selectedCrew, setSelectedCrew] = useState("YOSHI");
  const [list, setList] = useState([]);
  return (
    <>
      <BreadCrumb
        back
        page1="Essentials"
        page2="Foundation Essentials"
        page3="CREWs"
      />{" "}
      <div className="px-5 py-10 lg:p-20 h-[80vh] overflow-y-auto">
        <div className="w-full flex flex-col items-center justify-center space-y-2 lg:space-y-4">
          <Header
            name="CREWs"
            image="/assets/images/essentials/foundation/7.png"
          />

          <div className="w-full max-w-[100vw] z-20 flex flex-row items-center justify-center">
            <h4 className="text-2xl md:text-[32px] font-normal tracking-[2.4px] lg:tracking-[3.2px] lg:leading-[48px] text-black text-center font-satoshi leading-9 w-max">
              What Are CREWs?
            </h4>
          </div>

          <div className="w-full max-w-[100vw] z-20 flex flex-row items-center text-left justify-center mt-6">
            <h4 className="text-sm font-light lg:text-base leading-6 tracking-[0.35px] text-primary-neutral-500 text-left font-lato max-w-4xl capitalize">
              Our Caarya Remote Experiential Workplaces
              <span className="text-primary-red-medium">(CREWs)</span> are
              designed to facilitate students adaptation to remote work and
              collaboration. They provide opportunities for engagement with both
              peers and mentors across various Caarya Growth Centers, thereby
              promoting peer learning and professional growth.
            </h4>
          </div>
        </div>

        <div className="space-y-16 mt-20">
          <h1 className="w-full text-center text-black font-satoshi text-2xl font-normal leading-9 tracking-[2.4px]">
            Explore CREWs
          </h1>
          <div className="flex flex-col space-y-10">
            <div className="grid grid-cols-4 gap-2 p-2">
              {[
                {
                  name: "YOSHI",
                  image: "/assets/images/essentials/crew/1.png",
                },
                {
                  name: "WOJTEK",
                  image: "/assets/images/essentials/crew/2.png",
                },
                { name: "TOGO", image: "/assets/images/essentials/crew/3.png" },
                {
                  name: "CHER AMI",
                  image: "/assets/images/essentials/crew/4.png",
                },
              ]?.map((item) => {
                return (
                  <div
                    onClick={() => {
                      setSelectedCrew(item?.name);
                    }}
                    className={`flex flex-row w-[72px] h-[72px] items-center justify-center rounded-full ${
                      selectedCrew == item?.name
                        ? "border-2 border-primary-red-lightest"
                        : ""
                    }`}
                  >
                    <img
                      src={item?.image}
                      alt=""
                      className="w-14 h-14 rounded-full"
                    />
                  </div>
                );
              })}
            </div>
            <img
              src={`/assets/images/essentials/crew/${selectedCrew}.png`}
              alt=""
              className="w-full"
            />
            <div className="grid gap-5">
              {(selectedCrew == "YOSHI"
                ? yoshi
                : selectedCrew == "WOJTEK"
                ? wojtek
                : selectedCrew == "TOGO"
                ? moko
                : cherAmi
              )?.map((item) => {
                return <CityCard source={item?.source} city={item?.city} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Crew;
