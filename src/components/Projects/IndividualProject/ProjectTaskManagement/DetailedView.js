import { useEffect, useState } from "react";
import Tabs from "components/Comman/Tabs";
import FRD from "./Details/FRD";
import BRD from "./Details/BRD";
import EpicsAndStories from "./Details/EpicsAndStories";
import { findOne } from "config/APIs/project/documentation";
import { getAllEpics } from "config/APIs/task/epics";
const tabs = [
  { label: "FRD", value: "FRD" },
  { label: "BRD", value: "BRD" },
  { label: "Epics & Stories", value: "Epics & Stories" },
];

export default function DetailedView({ setSelectedTab, selectedTab, project }) {
  const [frd, setFrd] = useState({});
  const [brd, setBrd] = useState({});
  const [epics, setEpics] = useState([]);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    fetchDocumentattion();
    fetchEpics();
  }, [project]);

  const fetchDocumentattion = async () => {
    try {
      setFetching(true);
      const response = await findOne(project?.documentation_id);
      let data = response?.data?.data;
      setFrd(data?.frd);
      setBrd(data?.brd);
    } catch (err) {
      console.log("Fetch epic task error", err);
    }
    setFetching(false);
  };

  const fetchEpics = async () => {
    try {
      setFetching(true);
      const response = await getAllEpics({ project_id: project?.id });
      let data = response?.data?.data?.response;
      setEpics(data);
    } catch (err) {
      console.log("Fetch epic task error", err);
    }
    setFetching(false);
  };

  return (
    <>
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 w-full justify-between">
        {selectedTab === "FRD" && (
          <FRD frd={frd} project={project} epics={epics} />
        )}
        {selectedTab === "BRD" && <BRD brd={brd} project={project} />}
        {selectedTab === "Epics & Stories" && <EpicsAndStories epics={epics} />}
        <div className="lg:w-1/2">
          <img
            src="assets/images/FRD.png"
            alt="FRD"
            className="object-contain mx-auto"
          />
        </div>
      </div>
    </>
  );
}
