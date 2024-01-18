import TaskLoaderCard from "components/Tasks/Card/TaskLoader";

function TaskListLoader({ listViewOnly }) {
  return (
    <div
      className={`space-y-5 mb-5 ${
        listViewOnly
          ? ""
          : "sm:space-y-0 sm:grid lg:grid-cols-2 xl:grid-cols-2 gap-4"
      }`}
    >
      {[1, 2, 3, 4].map(() => {
        return <TaskLoaderCard />;
      })}
    </div>
  );
}

export default TaskListLoader;
