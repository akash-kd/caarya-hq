import React, { useState } from "react";
import TrackGoalCard from "./TrackGoalCard";
import EmptyState from "components/Comman/EmptyState";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";

function TrackGoalList({ heading, list, onUpdate, assigned, isRecommended }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col ">
      <div className="flex justify-between gap-4 p-2 items-center">
        <h1 className="font-poppins  text-primary-gray-800 font-poppins text-sm font-medium">
          {heading}
          <span className="text-primary-gray-300 font-light ml-1">
            ({list?.length})
          </span>
        </h1>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary-gray-200 w-7 h-7 rounded-full grid place-items-center text-xl "
        >
          {isOpen ? <BiChevronUp /> : <BiChevronDown />}
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="overflow-hidden"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto" },
              collapsed: { height: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="pb-8">
              <div className="px-2 py-3 space-y-6 bg-primary-gray-25">
                {list?.length > 0 ? (
                  list?.map((goal) => {
                    return (
                      <TrackGoalCard
                        key={goal?.id}
                        item={goal}
                        onUpdate={onUpdate}
                        assigned={assigned}
                        isRecommended={isRecommended}
                      />
                    );
                  })
                ) : (
                  <EmptyState text={`No Goals are due!`} noImage />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TrackGoalList;
