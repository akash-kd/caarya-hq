import EmptyState from "components/Comman/EmptyState";
import SquadCard from "components/MySquad/SquadCard/index.js";
import SquadCardLoader from "components/MySquad/SquadCard/SquadCardLoader";
import React from "react";
import { useHistory } from "react-router-dom";

function UserSquad({ list, fetching, details }) {
  const history = useHistory();
  return (
    <div className="w-full px-5 py-4 overflow-x-hidden">
      <div className="p-0 lg:p-5 rounded-[8px] lg:bg-white">
        {!fetching ? (
          list?.mentor ||
          list?.mentees?.length > 0 ||
          list?.teamMembers?.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
              {list?.mentor && (
                <SquadCard
                  profile={list?.mentor}
                  onSelect={(person) => {
                    if (window.innerWidth < 1024) {
                      history.push({
                        pathname: `/squadUser/${person?.id}`,
                        state: { user: person },
                      });
                    }
                  }}
                  cardView
                  isInsideTab
                />
              )}
              {list?.mentees?.map((item) => {
                return (
                  <SquadCard
                    profile={item}
                    onSelect={(person) => {
                      if (window.innerWidth < 1024) {
                        history.push({
                          pathname: `/squadUser/${person?.id}`,
                          state: { user: person },
                        });
                      }
                    }}
                    cardView
                    isInsideTab
                  />
                );
              })}
              {list?.teamMembers?.map((item) => {
                return (
                  <SquadCard
                    profile={item}
                    onSelect={(person) => {
                      if (window.innerWidth < 1024) {
                        history.push({
                          pathname: `/squadUser/${person?.id}`,
                          state: { user: person },
                        });
                      }
                    }}
                    cardView
                    isInsideTab
                  />
                );
              })}
            </div>
          ) : (
            <EmptyState
              image="/assets/images/empty/member.svg"
              imageMedium
              text={`${details?.first_name} doesn't have any squad mates yet!`}
            />
          )
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
            {[1, 2, 3, 4]?.map((i) => {
              return (
                <div className=" rounded-20px">
                  <SquadCardLoader />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSquad;
