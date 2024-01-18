import React, { useEffect, useState } from "react";

import TasksList from "components/Comman/Lists/TaskList";
import TaskListLoader from "components/Comman/Loaders/TaskListLoader";
import EmptyState from "components/Comman/EmptyState";
import EmptyTasks from "assets/icons/EmptyTasks.png";

function UsersTask({ tasks, fetching, getTasks, details }) {
  return (
    <div className="w-full py-4">
      <div className="p-5 rounded-[8px] bg-white">
        <p className="text-xs font-lato font-bold leading-4 text-primary-gray-900 mb-5 text-gray-500">
          {!fetching && tasks.length > 0 && (
            <span>Showing: {tasks.length} tasks</span>
          )}
        </p>
        {!fetching && tasks.length > 0 && (
          <TasksList onUpdate={() => getTasks()} tasks={tasks} />
        )}

        {fetching && <TaskListLoader />}
        {!fetching && tasks.length === 0 && (
          <EmptyState
            image={EmptyTasks}
            imageMedium
            text={`${details?.first_name} doesn't have any tasks!`}
          />
        )}
      </div>
    </div>
  );
}

export default UsersTask;
