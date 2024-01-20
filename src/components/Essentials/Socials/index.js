import React from "react";
import ThePodcast from "./ThePodcast";
import ReelFeatured from "./ReelFeatured";
import CuriousProLatest from "./CuriousProLatest";
import AcrossNetwork from "./AcrossNetwork";
import ReelFollowUs from "./ReelFollowUs";

function Socials() {
  return (
    <div className="h-[80vh] overflow-y-auto">
      <ThePodcast />
      <ReelFeatured />
      <CuriousProLatest />
      <AcrossNetwork />
      <ReelFollowUs />
    </div>
  );
}

export default Socials;
