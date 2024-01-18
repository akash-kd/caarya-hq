import React from "react";
//Icons
import {
  PlayIcon,
  UserCircleIcon,
  NewspaperIcon,
  HandIcon,
} from "@heroicons/react/outline";

import Slider from "react-slick";
import BorderedStatCard from "components/Comman/Cards/StatCards/BorderedStatCards";
import { TASK_TYPE_BUGS, TASK_TYPE_TASKS } from "helpers/task";
import { getTypeDatePeriod } from "helpers/utils/task";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as TaskAPI from "config/APIs/task/task";

/**
 * ToDos Page Header Component
 * @param {Function} setFilter - Function to set the filter index
 * @param {Number} filter - filter index
 * @param {String} time - "today","week","later"
 * @returns
 */

const TaskStats = ({ setFilter, time, filter, assignedAs }) => {
  const [taskStats, setTaskStats] = React.useState({});
  const [taskIssues, setTaskIssues] = React.useState({});

  const fetchIssues = async () => {
    let query = {
      entity: "task",
    };

    if (time) {
      query = { ...query, ...getTypeDatePeriod(time) };
    }
    if (assignedAs) {
      query = {
        ...query,
        assignedAs: assignedAs == "dashboard" ? "owner" : assignedAs,
      };
    }
    try {
      const response = await TaskAPI.getTaskStats(query);
      console.log(response);
      const { data: fetchedData } = response.data;
      setTaskIssues(fetchedData);
    } catch (err) {
      console.log("Task issues fetch error", err);
    }
  };

  React.useEffect(() => {
    if (window.innerWidth >= 1024) {
      fetchIssues();
      console.log(assignedAs);
    }
  }, [time, assignedAs]);

  const Todostats = [
    {
      id: 4,
      name: "all tasks",
      stat: taskIssues.all,
      icon: HandIcon,
      fact: "",
      fact_for: "tasks",
      viewMore: () => setFilter(4),
    },
    {
      id: 5,
      name: "not started",
      stat: taskIssues.notStarted,
      icon: HandIcon,
      fact: "",
      fact_for: "initiatives",
      viewMore: () => setFilter(5),
    },
    {
      id: 1,
      name: "in progess",
      stat: taskStats.inProgress,
      icon: PlayIcon,
      fact: "",
      fact_for: "colleges",
      viewMore: () => setFilter(1),
    },
    {
      id: 3,
      name: "completed",
      stat: taskStats.completedLastWeek,
      icon: NewspaperIcon,
      fact: "",
      fact_for: "projects",
      viewMore: () => setFilter(3),
    },
  ];

  const stats = [
    {
      id: 1,
      name: "tasks in progess",
      stat: taskStats.inProgress,
      icon: PlayIcon,
      fact: "",
      fact_for: "colleges",
      viewMore: () => setFilter(1),
    },
    {
      id: 2,
      name: "tasks assigned to you",
      stat: taskStats.assigned,
      icon: UserCircleIcon,
      fact: "",
      fact_for: "roles",
      viewMore: () => setFilter(2),
    },
    {
      id: 3,
      name: "tasks completed last week",
      stat: taskStats.completedLastWeek,
      icon: NewspaperIcon,
      fact: "",
      fact_for: "projects",
      viewMore: () => setFilter(3),
    },
  ];

  return (
    <div className="my-10">
      <div className="md:pb-3">
        <Slider
          arrows={false}
          dots
          infinite
          speed={1000}
          responsive={[
            {
              breakpoint: 1240,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
          slidesToShow={Math.min(4, Todostats.length)}
          slidesToScroll={2}
        >
          {Todostats.map((item) => (
            <BorderedStatCard
              item={item}
              onClick={() => {
                item?.viewMore();
              }}
              selected={Todostats?.find((i) => i?.id == filter)}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TaskStats;
