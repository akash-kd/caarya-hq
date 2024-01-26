import React from "react";
import BreadCrumb from "components/Comman/BreadCrumb";
import PageHeader from "components/Comman/PageHeader";

function Better() {
  return (
    <>
      {" "}
      <BreadCrumb back page1="Essentials" page2="Lets Make Us Better" />{" "}
      <div className="px-4 py-8 lg:p-20 h-[80vh] overflow-y-auto">
        <div className="w-full flex flex-col items-center justify-center space-y-6">
          <PageHeader
            heading="Lets Make Us Better"
            description="Agree or disagree with what others feel are issues within Caarya. Or, write about what you feel is going wrong or can be improved in Caarya."
          />
        </div>
      </div>
    </>
  );
}

export default Better;
