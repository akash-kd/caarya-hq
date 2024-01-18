import { useState } from "react";

import MySquad from "components/MySquad/SquadList";
import SearchBox from "components/Comman/Inputs/SearchBox";
import { useHistory } from "react-router-dom";

function SquadPageMobile() {
  const history = useHistory();
  const [search, setSearch] = useState({
    searchText: "",
    isSearch: false,
  });

  return (
    <>
      <div className="px-7.5 pt-2.5">
        <SearchBox
          placeholder="Find a squadmate!"
          search={search}
          setSearch={setSearch}
        />
      </div>

      <div className="max-h-80vh overflow-y-hidden">
        <MySquad
          search={search}
          onSelect={(person) => {
            if (window.innerWidth < 1024) {
              history.push({
                pathname: `/squadUser/${person?.id}`,
                state: { user: person },
              });
            }
          }}
        />
      </div>
    </>
  );
}

export default SquadPageMobile;
