import { useState, useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import * as GoalsAPI from "config/APIs/task/goal";

// APIs
import Tasks from "components/Tasks";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import IconFilter from "components/Comman/Inputs/IconFilter";
import SearchBox from "components/Comman/Inputs/SearchBox";
import { getProjectName } from "helpers/projects";
import Tabs from "components/Comman/Tabs";
import TaskStats from "components/Tasks/TaskStats";
import GoalsList from "components/Tasks/GoalsList";
import { updateAddTask } from "redux/task";
import TaskCreateModal from "components/Modals/Task/TaskCreate";
const tabs = [
  { label: "Dashboard", value: "dashboard" },
  { label: "My Tasks", value: "owner" },
  { label: "My Collaborations", value: "collaborator" },
  { label: "Icebox", value: "icebox" },
  // { label: "Created by me", value: "creator" },
  // { label: "Requested to focus", value: "requestedFocus" },
  // { label: "Completed", value: "completed" },
];

function AllTasks() {
  const dispatch = useDispatch();
  const userProjects = useSelector((state) => state.user.projects);
  const user = useSelector((state) => state.user.user);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [selectedGoal, setSelectedGoal] = useState();
  const [goals, setGoals] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [filterList, setFilterList] = useState([]);
  const [statQuery, setStatQuery] = useState({});
  const [selectedProject, setSelectedProject] = useState({
    label: "All Projects",
    value: null,
  });

  const [search, setSearch] = useState({
    searchText: "",
    isSearch: false,
  });
  const fetchGoals = async () => {
    setFetching(true);
    try {
      const resp = await GoalsAPI.getAllUserGoals();
      const resp1 = await GoalsAPI.getAllGoals({ ownerId: user?.id });
      let arr = resp1.data.data?.response;
      arr = arr.concat(resp?.data?.data?.response);
      arr = [...new Map(arr.map((item) => [item["id"], item])).values()];
      setGoals(arr);
      setSelectedGoal(arr[0]);
    } catch (err) {
      console.log("Fetch project error", err);
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
    if (selectedGoal) {
      dispatch(updateAddTask({ goal: selectedGoal }));
    } else {
      dispatch(updateAddTask({ goal: null }));
    }
  }, [selectedGoal]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      let allProjects = [];
      Object.keys(userProjects).length > 0 &&
        Object.keys(userProjects).map((type) => {
          allProjects = allProjects.concat(userProjects[type]);
        });
      let temp = allProjects.map((e) => ({
        label: getProjectName(e),
        value: e?.id,
      }));
      temp.unshift({ label: "All Projects", value: null });
      setFilterList(temp);
    }

    return () => {
      isMounted = false;
    };
  }, [userProjects]);

  return (
    <>
      <TaskCreateModal
        goal={selectedGoal}
        project={selectedProject?.value !== null ? selectedProject : null}
        isOpen={openCreate}
        closeModal={() => setOpenCreate(false)}
        onCreate={() => {}}
        myTask
      />
      <div className="px-7.5 pt-2.5 hidden lg:block">
        <TaskStats
          time={statQuery?.time}
          filter={statQuery?.filter}
          setFilter={(v) => setStatQuery({ ...statQuery, filter: v })}
          assignedAs={selectedTab}
        />
      </div>
      <div className="px-5 pt-2.5 lg:hidden block">
        <SearchBox
          placeholder="Find your task!"
          search={search}
          setSearch={setSearch}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] lg:gap-4">
        <div className={`lg:mt-12 w-full xl:w-full min-w-[315px] px-5 lg:px-0`}>
          <GoalsList
            selectedGoal={selectedGoal}
            setSelectedGoal={(val) => setSelectedGoal(val)}
            goals={goals}
            fetchGoals={fetchGoals}
            fetching={fetching}
            setGoals={setGoals}
          />
        </div>
        <div className={goals?.length > 0 ? `-mt-12 lg:mt-0` : ""}>
          <Tabs
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />

          <div className="z-20 w-full py-2 pl-8 pr-6 flex flex-row items-center justify-between lg:hidden">
            <h1 className="text-xs font-lato font-normal w-full text-primary-gray-900 flex flex-row items-center">
              Showing{" "}
              <p className="font-bold">
                {selectedProject ? `: ${selectedProject?.label}` : ""}
              </p>
            </h1>
            <IconFilter
              icon={AdjustmentsIcon}
              list={filterList}
              iconCss="text-primary-gray-1000 h-4 w-5 transform rotate-90"
              onClick={(val) => {
                setSelectedProject(val);
              }}
              selected={selectedProject}
            />
          </div>

          <div className="max-h-60vh  block lg:hidden">
            <Tasks
              selectedTab={selectedTab}
              search={search}
              selectedProject={selectedProject}
              goalFetching={fetching}
              selectedGoal={selectedGoal}
              setOpenCreate={setOpenCreate}
            />
          </div>
          <div className="hidden lg:block">
            <Tasks
              selectedTab={selectedTab}
              search={search}
              selectedProject={selectedProject}
              setSearch={setSearch}
              filterList={filterList}
              setSelectedProject={setSelectedProject}
              statQuery={statQuery}
              setStatQuery={setStatQuery}
              goalFetching={fetching}
              selectedGoal={selectedGoal}
              setOpenCreate={setOpenCreate}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AllTasks;
