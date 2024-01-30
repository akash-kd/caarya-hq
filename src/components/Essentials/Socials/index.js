import React from "react";
import ThePodcast from "./ThePodcast";
import ReelFeatured from "./ReelFeatured";
import CuriousProLatest from "./CuriousProLatest";
import AcrossNetwork from "./AcrossNetwork";
import ReelFollowUs from "./ReelFollowUs";
import BreadCrumb from "components/Comman/BreadCrumb";

function Socials() {
  return (
    <>
      <BreadCrumb
        back
        page1="Essentials"
        page2="Foundation Essentials"
        page3="Our Socials"
      />
      <div className="h-[80vh] overflow-y-auto">
        <ThePodcast />
        <ReelFeatured />
        <CuriousProLatest />
        <AcrossNetwork />
        <ReelFollowUs />
      </div>
    </>
  );
}

export default Socials;
