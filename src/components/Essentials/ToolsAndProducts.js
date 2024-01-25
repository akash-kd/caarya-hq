import BreadCrumb from "components/Comman/BreadCrumb";
import AppLinks from "components/Shareables/AppLinks";
import React from "react";

function ToolsAndProducts() {
  return (
    <>
      <BreadCrumb
        back
        page1="Essentials"
        page2="Foundation Essentials"
        page3="Tools & Products"
      />
      <div className="pt-5">
        <AppLinks />
      </div>
    </>
  );
}

export default ToolsAndProducts;
