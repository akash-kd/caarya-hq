import ChronosButton from "components/Comman/Buttons";
import React from "react";
import { useEffect, useState } from "react";

import messages from "./images/messages.png";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { MdArrowBack, MdOutlineTimer } from "react-icons/md";
import { BiChevronDown } from "react-icons/bi";
import { FaRegLaugh } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useSelector } from "react-redux";
function GoalCard({ goal }) {
  const [showGoalDetails, setShowGoalDetails] = useState(false);
  return (
    <li
      onClick={() => setShowGoalDetails(!showGoalDetails)}
      className="p-2 my-4 bg-white border-b-2 border-gray-200 cursor-pointer"
    >
      <div>
        <p className="flex items-center justify-between">
          <span className="text-sm font-bold">{goal?.title}</span>
          <span>
            <BiChevronDown size={24} />
          </span>
        </p>
        <p className="text-xs text-gray-800">{goal?.description}</p>
        {showGoalDetails && (
          <>
            <div className="mt-3">
              <h3 className="text-sm font-bold">How did it go?</h3>
              <p className="text-sm font-karla">
                I was struggling to understand and start the work, but with
                collaboration, I could finish it faster
              </p>
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-bold">Emoji</h3>
              <p>
                <span className="inline-block mt-0.5">
                  <FaRegLaugh size={20} />
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </li>
  );
}
function ClockoutModal({ closeModal, onClick }) {
  const inFocusGoal = useSelector((state) => state.goals.inFocus?.goals);
  return (
    <>
      <div className="hidden  bg-white mx-auto rounded-20px p-5 py-8 max-w-4xl w-full lg:grid grid-cols-[2fr,1fr] gap-4 relative z-[999]">
        <div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">
              Are you sure you want to clock out?
            </h3>
            <p className="text-center text-gray-400 text-sm">
              Clocking out without finishing your Goals will show your Goal log
              as zero. This will eventually affect your performance?
            </p>
          </div>
          <div className="max-h-[200px] overflow-y-auto">
            <table className="w-full mt-5 table-auto overflow-scroll">
              <thead className="py-4">
                <tr className="bg-[#FAFAFA] py-4">
                  <th className="py-4 px-4 font-normal text-left">Goal Name</th>
                  <th className="py-4 px-4 font-normal text-left">
                    How did it go?
                  </th>
                  <th className="py-4 px-4 font-normal text-left">Emoji</th>
                </tr>
              </thead>
              <tbody className="">
                {inFocusGoal?.map((g) => {
                  return (
                    <tr>
                      <td className="text-left py-4 px-4">{g?.title}</td>
                      <td className="text-left py-4 px-4">
                        I was struggling to understand and start the work, but
                        with collaboration, I could finish it faster
                      </td>
                      <td>🤨</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center gap-2">
            <ChronosButton
              secondary
              text="Cancel Checkout"
              onClick={() => closeModal()}
            />
            <ChronosButton
              primary
              text="Confirm Checkout"
              onClick={() => {
                closeModal();
                onClick();
              }}
            />
          </div>
        </div>
        <div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Discord Updates</h3>
            <p className="text-center text-gray-400 text-sm">
              All your updates here will be posted to the discord channel as
              mentioned above.
            </p>

            <div className="text-center">
              <img
                src="assets/images/discord.png"
                alt=""
                className="mx-auto mt-5"
              />
            </div>
          </div>
        </div>
      </div>
      <section className="p-4 block lg:hidden">
        <header>
          <div className="flex items-center">
            <span onClick={() => closeModal()} className="mr-2 cursor-pointer">
              <MdArrowBack size={24} />
            </span>
            <span className="flex items-center justify-center flex-1 text-lg font-semibold">
              Clock Out Journal
            </span>
          </div>
        </header>
        <div className="mt-5">
          <h2 className="text-lg font-medium text-center text-primary-yellow-darkest">
            Are you sure you want to clock-out?
          </h2>
          <p className="text-xs text-center mt-1.5 text-gray-500">
            Clocking out without finishing your Goals will show your Goal log as
            zero. This will eventually affect your performance?
          </p>
        </div>
        <ul>
          {inFocusGoal?.map((g) => {
            return <GoalCard goal={g} />;
          })}
        </ul>
        <div className="mt-5">
          <h3 className="text-lg font-medium text-center text-primary-yellow-darkest">
            Discord Updates
          </h3>
          <p className="text-xs text-center font-karla mt-1.5 text-gray-500">
            All your updates here will be posted to the discord chanel; as
            mentioned above.
          </p>
          <div className="flex items-center justify-center mt-4">
            <img src={messages} alt="messages image" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-8 gap-x-[15px]">
          <ChronosButton
            secondary
            text="Cancel Checkout"
            onClick={() => closeModal()}
          />
          <ChronosButton
            primary
            text="Confirm Checkout"
            onClick={() => {
              closeModal();
              onClick();
            }}
          />
        </div>
      </section>
    </>
  );
}

export default ClockoutModal;
