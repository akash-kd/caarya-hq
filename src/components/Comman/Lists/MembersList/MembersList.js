import { useHistory } from "react-router-dom";

import { UserIcon } from "@heroicons/react/solid";

function MembersList({ members }) {
  const history = useHistory();
  return (
    <>
      {members.length > 0 &&
        members.map((person) => {
          return (
            <div
              key={person?.id}
              className="pt-3 pb-4 px-3 flex flex-row items-center justify-between relative border-b border-gray-200 cursor-pointer"
              onClick={() => {
                history.push({
                  pathname: `/squadUser/${person?.id}`,
                  state: { user: person },
                });
              }}
            >
              <div className="grid xs:grid-cols-6 w-full">
                <div className="flex flex-row items-center col-span-6">
                  <div
                    className={`w-12 h-12 flex flex-row items-center justify-center rounded-full `}
                  >
                    {person?.image?.url ? (
                      <img
                        src={person?.image?.url}
                        className="rounded-full h-12 w-12"
                        alt=""
                      />
                    ) : (
                      <UserIcon className="rounded-full h-12 w-12 theme-gray-500" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-md inter theme-gray-300 font-semibold cursor-pointer break-all">
                      {person.first_name}
                    </p>

                    <p className="text-xs inter max-w-max cursor-pointer theme-gray-300">
                      {person?.designation?.role?.role_name}
                    </p>
                    <p className="text-xs font-light theme-gray-300 max-w-max cursor-pointer">
                      {person?.designation?.rank?.rank_name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default MembersList;
