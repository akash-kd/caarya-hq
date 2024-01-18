import React, { useState, useEffect } from "react";
import Details from "components/Tasks/IndividualTask";
import TaskChats from "components/Tasks/IndividualTask/TaskChat";
import TaskDocuments from "components/Tasks/IndividualTask/TaskDocument";
import { useHistory, useParams } from "react-router-dom";
import * as TaskAPI from "config/APIs/task/task";
import { useLocation } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Insights from "components/Tasks/IndividualTask/Insights";
import Tabs from "components/Comman/Tabs";

const tabs = [
  { label: "Insights", value: "insights" },
  { label: "Chats", value: "chats" },
  { label: "Documents", value: "documents" },
  { label: "Details", value: "details" },
];

// Used as a page in mobile and modal in laptop

function Tasks({ taskId, closeModal, onUpdate }) {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState("insights");
  const [comments, setComments] = useState([]);
  const [details, setDetails] = useState({});

  useEffect(() => {
    let isMounted = true;

    if (isMounted && (id || taskId)) {
      fetchTask();
      fetchComments();
    }

    return () => {
      isMounted = false;
    };
  }, [id, taskId]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && location?.state?.tab) {
      setSelectedTab(location?.state?.tab);
    }

    return () => {
      isMounted = false;
    };
  }, [location?.state?.tab]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const fetchTask = async () => {
    try {
      const response = await TaskAPI.getTasksById(id || taskId);
      const task = response.data.data;
      setDetails(task);
    } catch (err) {
      console.log("Fetch task error", err);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await TaskAPI.getAllComments({ task: id || taskId });
      const task = response.data.data.response;
      setComments(task);
    } catch (err) {
      console.log("Fetch task error", err);
    }
  };

  return (
    <>
      <div className="px-0">
        <div className="px-2 mb-5 flex flex-row items-center space-x-2.5">
          <ArrowLeftIcon
            onClick={() => {
              if (window.innerWidth < 1024) history.goBack();
              else closeModal();
            }}
            className="w-4 text-primary-gray-1000 mr-2 cursor-pointer"
          />

          <p className="text-sm md:text-lg lg:text-xl line-clamp-2 leading-4 font-lato text-primary-gray-1000 cursor-pointer break-words font-extrabold">
            {details?.title}
          </p>
        </div>

        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      <div className="max-h-75vh lg:max-h-90vh overflow-y-auto pt-1.5">
        {selectedTab == "insights" && (
          <Insights
            setTab={setSelectedTab}
            fetchTask={fetchTask}
            details={details}
            setDetails={setDetails}
            onUpdate={() => {
              fetchTask();
              onUpdate();
            }}
          />
        )}
        {selectedTab == "chats" && (
          <TaskChats
            taskComments={comments}
            taskId={id || taskId}
            onUpdate={() => {
              fetchComments();
            }}
          />
        )}
        {selectedTab == "documents" && (
          <TaskDocuments
            taskId={id}
            taskDocuments={comments?.filter(
              (i) => i?.attachments?.length !== 0
            )}
          />
        )}
        {selectedTab == "details" && (
          <Details
            taskId={id}
            taskDetails={details}
            onUpdate={() => {
              fetchTask();
            }}
          />
        )}
      </div>
    </>
  );
}

export default Tasks;
