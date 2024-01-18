import React, { useState, useEffect } from "react";
//ICONS
import { XIcon } from "@heroicons/react/solid";
//Util Components

//Apis
import { getGoalIssue } from "config/APIs/task/goal";
import { getProjectIssue } from "config/APIs/project";

const initialIssues = [
  {
    title: (
      <>
        Projects without <b>releases</b>
      </>
    ),
    type: "noReleaseProject",
    count: 0,
    icon: "/assets/images/icons/notstarted.svg",
    filter: 5,
  },

  {
    title: (
      <>
        Projects without <b>goals</b>
      </>
    ),
    type: "noGoalProject",
    count: 0,
    icon: "/assets/images/icons/nodate.svg",
    filter: 7,
  },
];

/**
 * IssueList
 * @param {Object} issues - object containing details of all the issues
 * @param {Function} setFilter - Function to set the index number of issue selected
 * @returns
 */

const IssuesList = ({ issues, setFilter }) => {
  return (
    <div className="flex flex-col items-start space-y-2 lg:space-y-0 lg:grid grid-cols-2 2lg:grid-cols-3 gap-x-8 lg:gap-y-3">
      {issues.map((item) => {
        if (item?.count > 0)
          return (
            <div
              onClick={() => {
                setFilter(item);
              }}
              className="flex flex-row items-center justify-between w-full"
            >
              <div className="flex flex-row items-center">
                <img src={item?.icon} alt="" className="w-3 h-3 mr-2" />
                <h1 className="font-lato font-normal text-primary-gray-600 text-sm hover:scale-105 transition transform ease-in-out duration-150 hover:text-primary-indigo-650 cursor-pointer">
                  {item?.title}
                  <b> - {item?.count}</b>
                </h1>
              </div>
              <img
                src="/assets/images/icons/eye.svg"
                alt=""
                className="w-3 h-3 block lg:hidden"
              />
            </div>
          );
      })}
    </div>
  );
};

/**
 * IssueList Expandable Component
 * @param {String} time -"today","week","later"
 * @param {Function} setFilter - Function to set the index number of issue selected
 * @returns
 */

function ProjectIssues({
  setFilter,
  projectId,
  closeModal,
  time = "thisWeek",
}) {
  const [open, setOpen] = useState(true);
  const [show, setShow] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [total, setTotal] = React.useState(0);
  const [issues, setIssues] = React.useState(initialIssues);

  const fetchIssues = async () => {
    setFetching(true);
    let query = { time };

    if (projectId) {
      query = { ...query, projectId };
    }
    try {
      const response = await getProjectIssue(query);
      const { data: fetchedData } = response.data;
      let temp = issues;
      let count = 0;

      temp.map((item) => {
        if (item?.type) {
          item.count = fetchedData[item?.type] || 0;
          count = count + (fetchedData[item?.type] || 0);
        }
      });

      setTotal(count);
      setIssues(temp);
      setFetching(false);
    } catch (err) {
      console.log("Task issues fetch error", err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [projectId, time]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setShow(true);
      }, 500);
    }
  }, [open]);

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setOpen(false);
      }, 50);
    }
  }, [show]);

  return (
    <div className="p-5">
      <div className="flex flex-row items-center justify-between space-x-2.5">
        <p className="text-sm lg:text-2xl line-clamp-2 leading-4 font-lato text-primary-gray-1000 cursor-pointer break-words font-bold">
          Project Issues
        </p>
        <XIcon
          onClick={() => {
            closeModal();
          }}
          className="w-4 text-black ml-2 cursor-pointer"
        />
      </div>
      <div
        className={`mt-2 lg:mb-10 p-4.5 relative issues-component-ui ${
          open ? "issues-box-expanded" : "issues-box"
        }`}
      >
        <div className="flex flex-row items-start lg:items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center space-x-1">
              <img
                src="/assets/images/icons/health.svg"
                alt=""
                className="w-5 h-5"
              />
              {fetching ? (
                <h1 className="bg-indigo-100 h-8 w-10 rounded animate-pulse inter font-bold text-3xl ml-2"></h1>
              ) : (
                <h1 className="text-primary-indigo-650 font-lato font-bold text-3xl">
                  {total || 0}
                </h1>
              )}
            </div>
            <p className="poppins font-normal text-2xs text-primary-gray-600">
              Issues detected
            </p>
            {/* Open for Mobile  */}
            {/* {!open && (
            <ChevronDownIcon
              onClick={() => {
                setOpen(true);
              }}
              className="w-7 block lg:hidden cursor-pointer text-primary-indigo-650 mx-auto -mb-8"
            />
          )} */}
          </div>

          <div
            className={`hidden lg:block ${
              open ? "show-issues" : "hide-issues"
            }`}
          >
            {show && (
              <IssuesList
                setFilter={(val) => {
                  setFilter(val);
                  if (closeModal) closeModal();
                }}
                issues={issues}
              />
            )}
          </div>
          {/* Close  */}
          {/* {open && (
          <>
            <XIcon
              onClick={() => {
                setShow(false);
                setOpen(false);
              }}
              className="w-4 h-4 text-primary-indigo-650 cursor-pointer block lg:hidden"
            />
            <ChevronLeftIcon
              onClick={() => {
                setShow(false);
              }}
              className="h-8 text-primary-indigo-650 cursor-pointer lg:block hidden -mr-2.5"
            />
          </>
        )} */}
          {/* Open for laptop  */}
          {/* {!open && (
          <ChevronRightIcon
            onClick={() => {
              setOpen(true);
            }}
            className="h-8 text-primary-indigo-650 cursor-pointer lg:block hidden -mr-2.5"
          />
        )} */}
        </div>
        <div className={`mt-4 lg:hidden ${open && "show-issues"}`}>
          {show && (
            <IssuesList
              setFilter={(val) => {
                setFilter(val);
                if (closeModal) closeModal();
              }}
              issues={issues}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectIssues;
