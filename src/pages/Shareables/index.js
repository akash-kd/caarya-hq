import { useState, useEffect } from "react";

import SearchBox from "components/Comman/Inputs/SearchBox";
import LearningList from "components/Shareables";
import Tabs from "components/Comman/Tabs";
import SourcingDriveList from "components/SourcingDrive";
import AppLinks from "components/Shareables/AppLinks";
import BreadCrumb from "components/Comman/BreadCrumb";
import PageHeader from "components/Comman/PageHeader";
import Important from "components/Shareables/Important";

const tabs = [
  { label: "Docs & Sheets", value: "kits" },
  { label: "Important Stuff 💫", value: "important" },
  { label: "Quick Links", value: "links" },
];
function Shareables() {
  const [search, setSearch] = useState({
    placeholder: tabs[0]?.placeholder,
    searchText: "",
    isSearch: false,
  });
  const [selectedTab, setSelectedTab] = useState("kits");

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
      <BreadCrumb back page1="Resources" />
      <div className="py-8 px-4 space-y-10 max-h-80vh overflow-x-auto">
        <PageHeader
          heading="Resources"
          description="Section description here"
        />{" "}
        <SearchBox
          placeholder="Search for a resource"
          search={search}
          setSearch={setSearch}
        />{" "}
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />{" "}
        <div className="space-y-6">
          {selectedTab == "drives" ? (
            <>
              <SourcingDriveList search={search} />
            </>
          ) : selectedTab == "links" ? (
            <AppLinks search={search} />
          ) : selectedTab == "important" ? (
            <Important search={search} list={[1, 2, 3, 4, 5, 6]} />
          ) : (
            <LearningList search={search} type={selectedTab} />
          )}
        </div>
      </div>
    </>
  );
}

export default Shareables;
