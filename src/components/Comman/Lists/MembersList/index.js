import { useHistory } from "react-router-dom";

import { UserIcon } from "@heroicons/react/solid";
import SquadCard from "components/MySquad/SquadCard/index.js";

function MembersList({ category, members, onSelect, selectedMember }) {
  const history = useHistory();
  console.log(members);
  return (
    <div className="space-y-2.5">
      {/* <h1 className="text-xs ml-5 font-lato font-semibold leading-4 text-primary-gray-900">
        {category}
      </h1> */}

      <div className="pt-3 pb-1.5 flex flex-col w-full bg-transparent lg:rounded-[40px]">
        {members.length > 0 &&
          members.map((person, index) => {
            return (
              <SquadCard
                selected={selectedMember}
                profile={person}
                onSelect={() => {
                  onSelect(person);
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default MembersList;
