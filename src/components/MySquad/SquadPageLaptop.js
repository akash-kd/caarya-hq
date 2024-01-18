import { useState } from "react";

import MySquad from "components/MySquad/SquadList";
import EmptyState from "components/Comman/EmptyState";
import SquadUser from "pages/MySquad/SquadUser";
import { useSelector } from "react-redux";

function SquadPageLaptop() {
  const squad = useSelector((state) => state.user.squadList);
  const fetching = useSelector((state) => state.user.fetching);
  const [selectedMember, setSelectedMember] = useState();
  return (
    <>
      {!fetching && squad?.length == 0 ? (
        <div className="h-50vh flex flex-row items-center justify-center">
          <EmptyState
            text="You don't have any team mate yet!"
            image="/assets/images/empty/member.svg"
          />
        </div>
      ) : (
        <div className="max-h-95vh overflow-y-hidden w-full">
          <div className="w-full flex flex-row items-start justify-between space-x-4">
            <div className="w-1/3 min-w-[315px]">
              <MySquad
                selectedMember={selectedMember}
                onSelect={(val) => {
                  setSelectedMember(val);
                }}
              />
            </div>
            <div className="w-2/3">
              {selectedMember ? (
                <>
                  <SquadUser
                    memberId={selectedMember?.id}
                    member={selectedMember}
                  />
                </>
              ) : (
                <EmptyState
                  imageLarge
                  image="/assets/images/empty/member.svg"
                  text="Select a member to view!"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SquadPageLaptop;
