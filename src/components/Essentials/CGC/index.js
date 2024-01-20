import CardCarousel from "./CardCarousel";
import { yoshi, wojtek, moko, cherAmi } from "helpers/constants/city";

function CGC() {
  return (
    <div className="px-5 py-10 lg:p-20 gap-16 h-[80vh] overflow-y-auto">
      <h1 className="font-poppins font-medium text-[32px] text-center text-primary-red-medium underline underline-offset-[14px]">
        Explore CGCs
      </h1>

      <CardCarousel title="Yoshi Crew" data={yoshi} />
      <CardCarousel title="Wojtek Crew" data={wojtek} />
      <CardCarousel title="Moko Crew" data={moko} />
      <CardCarousel title="Cher Ami Crew" data={cherAmi} />
    </div>
  );
}

export default CGC;
