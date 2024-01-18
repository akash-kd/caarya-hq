import { useState, useEffect } from "react";

// Redux
import { useSelector } from "react-redux";
import MembersList from "components/Comman/Lists/MembersList";
import EmptyState from "components/Comman/EmptyState";
import SquadCardLoader from "./SquadCard/SquadCardLoader";

function MySquad({ search, onSelect, selectedMember }) {
  const squad = useSelector((state) => state.user.squadList);
  const fetching = useSelector((state) => state.user.fetching);
  const [active, setActive] = useState(true);

  const getList = (list) => {
    let t = active ? list?.filter((i) => i?.is_active == active) : [...list];

    t = search?.isSearch
      ? t.filter((e) =>
          e?.first_name.toLowerCase().includes(search?.searchText.toLowerCase())
        )
      : t;
    t = [...new Map(t.map((item) => [item["id"], item])).values()];

    return t;
  };

  useEffect(() => {
    if (squad?.length > 0 && window.innerWidth > 1024) onSelect(squad[0]);
  }, []);

  return (
    <>
      <div className="py-5 flex flex-row items-center justify-between max-w-[90%] mx-auto">
        <h1 className="text-xs font-lato font-normal w-full text-primary-gray-900 flex flex-row items-center">
          Showing:{" "}
          <p className="font-normal ml-0.5">
            {active ? `${squad?.length} Members` : "Your all time squad"}
          </p>
        </h1>
        <div className="flex gap-2">
          <div className="flex gap-1 text-primary-gray-1000">
            <input
              type="radio"
              name="isActive"
              defaultChecked
              className="text-primary-gray-1000 border-primary-gray-1000 outline-primary-gray-1000"
              checked={active == true ? true : false}
              onChange={() => setActive(true)}
            />
            <label htmlFor="Active">Active</label>
          </div>

          <div className="flex gap-1">
            <input
              type="radio"
              name="isActive"
              className="text-primary-gray-1000 border-primary-gray-1000 outline-primary-gray-1000"
              checked={active !== true ? true : false}
              onChange={() => setActive(false)}
            />
            <label htmlFor="All">All</label>
          </div>
        </div>
      </div>
      <div className="w-full bg-transparent lg:rounded-b-[40px] max-w-[90%] mx-auto">
        <div className="space-y-5 max-h-70vh overflow-y-auto pb-16 lg:pb-5 overflow-x-hidden">
          {!fetching ? (
            squad.length > 0 ? (
              <MembersList
                selectedMember={selectedMember}
                onSelect={onSelect}
                category="All"
                members={getList(squad)}
              />
            ) : (
              <EmptyState
                text="You don't have any team mates yet!"
                image="/assets/images/empty/member.svg"
              />
            )
          ) : (
            <div className="pt-3 pb-1.5 flex flex-col w-full bg-transparent lg:rounded-[40px]">
              {[1, 2, 3, 4]?.map((item) => {
                return <SquadCardLoader />;
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MySquad;
