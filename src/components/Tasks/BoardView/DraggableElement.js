import { useState, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import * as TaskAPI from "config/APIs/task/task";
import { useDispatch } from "react-redux";
import { TaskStatus } from "helpers/task";
import { getProjectName } from "helpers/projects";
import TaskListLoader from "components/Comman/Loaders/TaskListLoader";

/**
 * Displays the draggable tasks under a particular tasks status
 * @returns
 */

const DraggableElement = ({
  prefix,
  elements,
  onUpdate,
  key,
  selectedTab,
  fetching,
  afterDelete,
}) => {
  let dispatch = useDispatch();
  const [addNew, setAddNew] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    status: prefix,
    dueDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setAddNew(false);

      setNewTask({
        title: "",
        status: prefix,
        dueDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      });
    }

    return () => {
      isMounted = false;
    };
  }, [elements]);

  const createNewTask = async (e) => {
    setNewTask({ ...newTask, title: e.target.value });
    if (creating) {
      return;
    }
    if (e.key === "Enter" || e.type === "blur") {
      if (newTask.title == "") {
        return;
      }
      setCreating(true);

      try {
        let body = {
          ...newTask,
        };

        const response = await TaskAPI.createTasks(body);
        onUpdate();
        // dispatch(addATask({ task: response?.data?.data }));
      } catch (err) {
        console.log("Error", err);
      }
      setCreating(false);
    }
  };

  return (
    <Droppable droppableId={`${prefix}`}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ minHeight: "100px", minWidth: "380px" }}
        >
          <div className="px-5 py-2 m-2 rounded-[40px] bg-primary-yellow-lightest">
            <div className="text-center text-xl font-lato font-normal py-2 text-primary-gray-1000">
              {TaskStatus.find((e) => e.value == prefix)?.label}
            </div>
            {prefix == "NotStarted" && (
              <>
                {addNew ? (
                  <div className="mb-4 kanban-add-new-card mx-auto md:bg-white px-2 py-1 mt-2">
                    <div>
                      <div className="flex flex-row items-center space-y-2">
                        <p className="font-lato text-2xl font-semibold tracking-tight text-primary-gray-1000 inline-block align-middle w-11/12">
                          <input
                            autoFocus
                            placeholder="Add a Title"
                            onBlur={(e) => {
                              createNewTask(e);
                            }}
                            onKeyPress={(e) => {
                              createNewTask(e);
                            }}
                            value={newTask?.title}
                            name="Task Title"
                            className="text-2xl font-semibold w-full focus:outline-none"
                            onChange={(e) => {
                              setNewTask({
                                ...newTask,
                                title: e.target.value,
                              });
                            }}
                          ></input>
                        </p>
                        {creating && (
                          <div className="w-5 h-5 border border-gray-900 border-t-0 animate-spin rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddNew(true)}
                    className="px-4 py-2.5 text-primary-gray-1000 font-normal text-sm cursor-default transform transition ease-in-out duration-150 hover:scale-105"
                  >
                    + New
                  </button>
                )}
              </>
            )}
            {elements?.length > 0 &&
              elements?.map((project) => {
                return (
                  <>
                    <div className="px-4 py-2.5">
                      <div className="flex flex-row items-center space-x-2">
                        <img
                          alt=""
                          src={
                            project?.project?.image?.url ||
                            "/assets/svg/icon/rocket.svg"
                          }
                          className="rounded-full h-5 w-5"
                        />
                        <h1 className="text-sm font-karla text-primary-yellow-darkest font-semibold">
                          {getProjectName(project?.project, project?.tasks)}
                        </h1>
                      </div>
                    </div>

                    {project?.tasks &&
                      project?.tasks.map((item, index) => {
                        return (
                          <ListItem
                            key={item.id}
                            project={project?.project?.title}
                            item={item}
                            index={index}
                            onUpdate={(id, val, field) => {
                              onUpdate(id, val, field);
                            }}
                            afterDelete={afterDelete}
                            selectedTab={selectedTab}
                            fetching={fetching}
                          />
                        );
                      })}
                    {fetching && <TaskListLoader listViewOnly />}

                    {provided.placeholder}
                  </>
                );
              })}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default DraggableElement;
