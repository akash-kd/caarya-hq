import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UsersLearning from "components/SquadUser/UsersLearning";
import UsersTask from "components/SquadUser/UsersTask";
import * as TaskAPI from "config/APIs/task/task";
import { useLocation } from "react-router-dom";

import { getUserDetails, getUserSquad } from "config/APIs/squad";
import { UserIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";
import UserMessages from "components/SquadUser/UserMessages";
import { useSelector } from "react-redux";
import Tabs from "components/Comman/Tabs";
import UserSquad from "components/SquadUser/UserSquad";

const tabs = [
  { label: "Tasks", value: "tasks" },
  { label: "Learning", value: "learning" },
  { label: "Messages", value: "messages" },
  // { label: "Squad", value: "squad" },
];

function SquadUser({ memberId, member }) {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const history = useHistory();
  const [details, setDetails] = useState(member || {});
  const [userSquad, setUserSquad] = useState([]);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [fetchingMessages, setFetchingMessages] = useState(false);
  const [fetchingSquad, setFetchingSquad] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTab, setSelectedTab] = useState("tasks");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      // If (member) {
      //   SetDetails(member);
      // }
      window.scrollTo({ top: 0, behavior: "smooth" });
      getMemberDetails();
      getTasks();
      // getMemberSquad();
    }

    return () => {
      isMounted = false;
    };
  }, [id, memberId]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && tasks.length > 0 && Object.keys(details).length > 0) {
      getMessages();
    }

    return () => {
      isMounted = false;
    };
  }, [tasks, details]);

  const getMessages = async () => {
    setFetchingMessages(true);
    let msg = [];
    try {
      const response = await TaskAPI.getAllComments(memberId);
      const c = response.data.data.tasks;
      msg = c;
    } catch (err) {
      console.log("Fetch task comment error", err);
    }

    setMessages(msg);
    setFetchingMessages(false);
  };

  const getMemberDetails = async () => {
    try {
      setFetchingDetails(true);
      const response = await getUserDetails(id || memberId);
      const user = response.data.data?.user;
      setDetails(user);
    } catch (err) {
      console.log("Fetch user error", err);
    }
    setFetchingDetails(false);
  };

  const getMemberSquad = async () => {
    setFetchingSquad(true);
    try {
      const response = await getUserSquad(id || memberId, { showStats: true });
      const data = response.data.data;
      setUserSquad(data);
    } catch (err) {
      console.log("Fetch user error", err);
    }
    setFetchingSquad(false);
  };

  const getTasks = async () => {
    setFetching(true);

    TaskAPI.getUsersTasks(id || memberId)
      .then((res) => {
        let resp = res.data.data.tasks;
        setTasks(resp);
        setFetching(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="w-full pt-2.5 px-2.5 lg:px-0">
        <div className="w-full px-5 relative max-w-md">
          <div className="absolute top-3 right-5 lg:hidden">
            <ArrowLeftIcon
              onClick={() => {
                history.goBack();
              }}
              className="w-4 text-primary-gray-1000 mr-2 cursor-pointer lg:cursor-default"
            />
          </div>
          <div
            className="p-5 flex flex-col w-full bg-white shadow-sm"
            style={{ borderRadius: "20px" }}
          >
            <div className="flex flex-row items-center space-x-2.5">
              <div
                className={`w-16 h-16 bg-gray-200 flex flex-row items-center justify-center rounded-full `}
              >
                {!fetchingDetails && details?.image?.url ? (
                  <img
                    src={details?.image?.url}
                    className="rounded-full h-16 w-16 object-cover"
                    alt="Image"
                  />
                ) : (
                  <div className="h-16 w-16 items-center flex justify-center">
                    <UserIcon className="rounded-full h-7 w-7 text-gray-500" />
                  </div>
                )}
              </div>
              {!fetchingDetails ? (
                <div className="">
                  <p className="text-xs font-lato text-primary-gray-1000 font-bold leading-4 cursor-pointer lg:cursor-default break-all mb-2">
                    {details?.first_name}
                  </p>

                  <p className="text-2xs tracking-normal font-lato font-normal leading-3 text-primary-gray-250 max-w-max cursor-pointer lg:cursor-default mb-2">
                    {details?.designation?.role?.role_name}
                  </p>
                  <p className="text-2xs tracking-normal font-lato font-normal leading-3 text-primary-gray-250 max-w-max cursor-pointer lg:cursor-default mb-2">
                    {details?.designation?.rank?.rank_name}
                  </p>
                </div>
              ) : (
                <div className="w-full">
                  <p className="text-xs font-lato text-primary-gray-900 bg-gray-200 h-4 w-2/3 mb-2 rounded animate-pulse font-normal leading-4 cursor-pointer break-all"></p>
                  <p className="text-xs font-lato text-primary-gray-900 bg-gray-200 h-3 w-1/3 mb-2 rounded animate-pulse font-normal leading-4 cursor-pointer break-all"></p>
                  <p className="text-xs font-lato text-primary-gray-900 bg-gray-200 h-3 w-1/3 mb-2 rounded animate-pulse font-normal leading-4 cursor-pointer break-all"></p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-5">
          <Tabs
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </div>
      <div className="min-h-40vh max-h-60vh lg:max-h-75vh overflow-y-auto">
        {selectedTab == "learning" && (
          <UsersLearning userId={id} details={details} />
        )}
        {selectedTab == "tasks" && (
          <UsersTask
            tasks={tasks}
            fetching={fetching}
            getTasks={getTasks}
            details={details}
          />
        )}
        {selectedTab == "messages" && (
          <UserMessages messages={messages} details={details} />
        )}
        {selectedTab == "squad" && (
          <UserSquad
            list={userSquad}
            fetching={fetchingSquad}
            details={details}
          />
        )}
      </div>
    </>
  );
}

export default SquadUser;
