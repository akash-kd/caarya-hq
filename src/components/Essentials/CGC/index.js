import BreadCrumb from "components/Comman/BreadCrumb";
import Header from "../Header";
import CardCarousel from "./CardCarousel";
import { yoshi, wojtek, moko, cherAmi } from "helpers/constants/city";
import Assessment from "components/Comman/Buttons/Assessment";

function CGC() {
  return (
    <>
      <BreadCrumb
        back
        page1="Essentials"
        page2="Foundation Essentials"
        page3="Caarya Growth Centers"
      />{" "}
      <div className="px-5 py-10 lg:p-20 h-[80vh] overflow-y-auto">
        <div className="w-full flex flex-col items-center justify-center space-y-2 lg:space-y-4">
          <Header
            name="Caarya Growth Centers"
            image="/assets/images/essentials/foundation/6.png"
          />

          <div className="w-full max-w-[100vw] z-20 flex flex-row items-center justify-center">
            <h4 className="text-2xl md:text-[32px] font-normal tracking-[2.4px] lg:tracking-[3.2px] lg:leading-[48px] text-black text-center font-satoshi leading-9 w-max">
              What Are CGCs?{" "}
            </h4>
          </div>

          <div className="w-full mt-6 max-w-[100vw] z-20 flex flex-row items-center text-left justify-center">
            <h4 className="text-sm font-light lg:text-base leading-6 tracking-[0.35px] text-primary-neutral-500 text-left font-lato max-w-4xl capitalize">
              Caarya Growth Centers (CGCs) represent{" "}
              <span className="text-primary-red-medium">
                vibrant microcosms of the broader Caarya ecosystem,
              </span>{" "}
              city-based hubs fostering dynamic interaction among startups,
              students, skill experts, career makers, educators, and
              gig-workers.
              <br />
              <br /> These centers are dedicated to exploring and shaping three
              vital facets of the contemporary and future world -{" "}
              <span className="text-primary-red-medium">
                the future of careers, the future of education, and the future
                of work.
              </span>
              <br />
              <br /> Here, students are not mere observers; they are active
              participants,{" "}
              <span className="text-primary-red-medium">
                engaging in short-term work commitments with startups,
              </span>{" "}
              acquiring new skills, and gaining practical experience that sets
              the stage for their career paths.
              <br />
              <br /> By providing a platform for such enriched interactions,
              CGCs not only catalyze the growth of startups but also empower
              students and professionals to{" "}
              <span className="text-primary-red-medium">
                adapt, evolve, and thrive
              </span>{" "}
              in the ever-changing landscape of work and education.{" "}
            </h4>
          </div>
        </div>

        <div className="space-y-14 mt-20">
          <h1 className="w-full text-center text-black font-satoshi text-2xl font-normal leading-9 tracking-[2.4px]">
            Explore CGCs
          </h1>
          <CardCarousel title="Yoshi Crew" data={yoshi} />
          <CardCarousel title="Wojtek Crew" data={wojtek} />
          <CardCarousel title="Togo Crew" data={moko} />
          <CardCarousel title="Cher Ami Crew" data={cherAmi} />
          <Assessment />
        </div>
      </div>
    </>
  );
}

export default CGC;
