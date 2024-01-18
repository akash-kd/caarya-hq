import { useState, useEffect } from "react";

import SearchBox from "components/Comman/Inputs/SearchBox";
import LearningList from "components/Shareables";
import Tabs from "components/Comman/Tabs";
import SourcingDriveList from "components/SourcingDrive";
import AppLinks from "components/Shareables/AppLinks";

const tabs = [
  // { label: "Knowledge", value: "knowledge" },
  { label: "Drives", value: "drives" },
  { label: "FYI", value: "fyi" },
  { label: "Kits", value: "kits" },
  { label: "Links", value: "links" },
];
function Shareables() {
  const [search, setSearch] = useState({
    placeholder: tabs[0]?.placeholder,
    searchText: "",
    isSearch: false,
  });
  const [selectedTab, setSelectedTab] = useState("drives");

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setSearch({
        placeholder: tabs?.find((i) => i?.value == selectedTab)?.placeholder,
        isSearch: false,
        searchText: "",
      });
    }

    return () => {
      isMounted = false;
    };
  }, [selectedTab]);

  return (
    <>
      <div className="px-7.5 pt-2.5">
        <SearchBox
          placeholder="Find a shareable!"
          search={search}
          setSearch={setSearch}
        />
      </div>
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="max-h-70vh overflow-y-hidden">
        {selectedTab == "drives" ? (
          <>
            <SourcingDriveList search={search} />
          </>
        ) : selectedTab == "links" ? (
          <AppLinks search={search} />
        ) : (
          <LearningList search={search} type={selectedTab} />
        )}
      </div>
    </>
  );
}

export default Shareables;
