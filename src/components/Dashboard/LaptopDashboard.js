import React, { useState } from "react";
import Side_component from "components/Dashboard/Components/SideBar";
import { MegaphoneSimple } from "@phosphor-icons/react";
import PickYourTask, {
  PickYourTaskForSmallScreen,
} from "components/Dashboard/Components/PickYourTask";
import UpcomingRewards from "components/Dashboard/Components/UpcomingRewards";
import Tracker from "components/Dashboard/Components/Tracker";
import Boxes from "components/Dashboard/Components/Boxes";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllgoals } from "redux/goal";

import ChronosButton from "components/Comman/Buttons";
import GoalsCreate from "components/Modals/Goal/GoalCreate";
import { ReactComponent as GoalIcon } from "assets/icons/Goal.svg";

function LaptopDashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [openMobileCreateModal, setOpenMobileCreateModal] = useState(false);
  const [mobileCreateModal, setMobileCreateModal] = useState(false);
  return (
    <>
      <Side_component
        isOpen={openMobileCreateModal}
        closeModal={() => setOpenMobileCreateModal(false)}
      />
      <div className="mx-4 md:mx-20 font-lato">
        <div className="text-base md:text-lg text-primary-yellow-darkest">
          Good evening, {user?.first_name}
        </div>
        <div className="mt-1">
          <p className="text-primary-yellow-darkest text-xs md:text-sm opacity-[0.4]">
            Here's where you'll view a summary of your status, priorities,
            workload, tasks, goals and more.
          </p>
        </div>
        <div className="grid grid-cols-1 mt-8 md:grid-cols-3 md:gap-10">
          <div className="md:col-span-2">
            <Tracker />
            <UpcomingRewards />
          </div>
          <div className="grid grid-cols-3 mt-4 md:mt-0 gap-x-2 md:gap-x-0 md:block md:col-span-1">
            <Boxes setOpenMobileCreateModal={setOpenMobileCreateModal} />
          </div>
        </div>
        <div className="mt-8 md:hidden">
          <div className="flex items-center gap-1">
            <div className="text-base font-medium text-primary-yellow-darkest">
              Goals for the week
            </div>
            <MegaphoneSimple size={25} className="ml-1" />
          </div>
          <div className="text-gray-400 cursor-pointer text-2xs">
            Choose 5 goals today smash them out to earn rewards!
          </div>
          <PickYourTaskForSmallScreen />
        </div>
        <div className="bg-white hidden md:block rounded-[10px] shadow-md mt-2 p-6">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <div className="text-base font-semibold text-primary-yellow-darkest">
                  Goals for the week
                </div>
                <MegaphoneSimple size={25} className="ml-1" />
              </div>
              <div className="mr-8 text-gray-400 cursor-pointer text-2xs">
                Choose 5 goals today smash them out to earn rewards!
              </div>
            </div>
            <ChronosButton
              primary
              text="Add New Goal"
              icon={<GoalIcon className="fill-white h-6 ml-1" />}
              onClick={() => {
                setMobileCreateModal(true);
              }}
            />
          </div>
          <PickYourTask />
        </div>
        <GoalsCreate
          // projectType={project?.type}
          // project={project}
          isOpen={mobileCreateModal}
          closeModal={() => setMobileCreateModal(false)}
          onCreate={(val) => {
            dispatch(fetchAllgoals());
          }}
        />
      </div>
    </>
  );
}

export default LaptopDashboard;
