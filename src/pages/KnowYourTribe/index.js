import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import ProfileCards from "components/Comman/Cards/ProfileCards/ProfileCardV2";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function KnowYourTribe() {
  const history = useHistory();
  const users = useSelector((state) => state?.dropdown?.users?.list);
  return (
    <>
      <div
        onClick={() => {
          history.goBack();
        }}
        className="w-full fixed top-12 space-x-2 font-lato text-xs z-[50] right-0 left-0 bg-white flex flex-row items-center py-2.5 px-4"
      >
        <ArrowLeft />
        <p>Back</p>
      </div>
      <div className="bg-primary-gray-50 mt-5 px-4 w-full pt-4 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-85vh lg:h-auto overflow-y-auto">
        {users?.map((item) => {
          if (item?.user_type == "caarya-core")
            return <ProfileCards person={item} />;
        })}
      </div>
    </>
  );
}

export default KnowYourTribe;
