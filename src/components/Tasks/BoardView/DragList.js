import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import * as TaskAPI from "config/APIs/task/task";
import { useDispatch } from "react-redux";

// const lists = ["NotStarted", "InProgress", "InReview", "Completed"];
const lists = ["NotStarted", "InProgress", "InReview"];

/**
 * Displays the draggable tasks filtered on the status of task
 * @returns
 */

function DragList({
  data,
  fetching,
  selectedTab,
  onUpdate,
  afterDelete,
  showLoadMore,
}) {
  let dispatch = useDispatch();
  const [elements, setElements] = React.useState([]);

  useEffect(() => {
    getElements();
  }, [data, fetching]);

  const getElements = async () => {
    // Not Started,In Progress, In Review, Completed

    let projects = [];
    let arr = [];
    let unassigned = [];

    data?.map((item) => {
      if (projects?.includes(item?.project?.title)) {
        arr.map((item2) => {
          if (item2?.project?.title === item?.project?.title) {
            item2.tasks.push(item);
          }
        });
      } else {
        if (item?.project) {
          let obj = { project: item?.project, tasks: [item] };
          arr.push(obj);
          projects.push(item?.project?.title);
        } else {
          unassigned.push(item);
        }
      }
    });

    let icebox = arr?.find((i) =>
      i?.project?.title?.toLowerCase()?.includes("icebox")
    );

    arr = arr?.filter(
      (i) => !i?.project?.title?.toLowerCase()?.includes("icebox")
    );

    if (icebox) {
      arr = [icebox]?.concat(arr);
    }

    if (unassigned.length > 0)
      arr.push({ project: { title: "Unassigned" }, tasks: [...unassigned] });

    let temp = { NotStarted: [], InProgress: [], InReview: [] };

    arr.map((item) => {
      item?.tasks.map((item2) => {
        let status = item2?.status || "NotStarted";

        if (
          temp[status]?.find((i) => i?.project?.title === item?.project?.title)
        ) {
          let index = temp[status].findIndex(
            (i) => i?.project?.title === item?.project?.title
          );

          temp[status][index]?.tasks.push(item2);
        } else {
          if (item2?.project) {
            temp[status]?.push({ project: item?.project, tasks: [item2] });
          } else {
            temp[status]?.push({
              project: { title: "Unassigned" },
              tasks: [item2],
            });
          }
        }
      });
    });
    console.log(temp);
    setElements(temp);
  };

  const updateTaskStatus = async (body) => {
    let mainBody = {
      task: body,
    };
    try {
      const response = await TaskAPI.updateTasks(body.id, mainBody);
      // dispatch(updateATask({ id: body.id, task: response.data.data }));
      onUpdate(body?.id, body?.status, "status");
    } catch (err) {
      console.log(err);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };

    // Getting the source list
    const sourceList = listCopy[result.source.droppableId];

    let tempSource = [];

    sourceList.map((i) => {
      if (i?.tasks?.length > 0) {
        tempSource = tempSource.concat(i?.tasks);
      }
    });

    // Getting the itm to drag
    let itemToMove = tempSource?.find((e) => e?.id === result?.draggableId);
    let tempBody = { ...itemToMove };
    tempBody.status = result.destination.droppableId;
    updateTaskStatus(tempBody);

    // Removing the item from the source list
    sourceList.map((i) => {
      if (itemToMove?.project) {
        if (i?.project?.title === itemToMove?.project?.title) {
          i.tasks = i.tasks.filter((e) => e?.id !== itemToMove?.id);
        }
      } else if (i?.project?.title === "Unassigned") {
        i.tasks = i.tasks.filter((e) => e?.id !== itemToMove?.id);
      }
    });

    listCopy[result.source.droppableId] = sourceList;

    // Getting the old drop list
    const oldDropList = listCopy[result.destination.droppableId];

    // Add the item to the dragged location
    let allProjects = oldDropList?.map((i) => i?.project?.title);

    if (allProjects?.includes(itemToMove?.project?.title)) {
      oldDropList.map((i) => {
        if (itemToMove?.project) {
          if (i?.project?.title === itemToMove?.project?.title) {
            i.tasks = i.tasks.filter((e) => e?.id !== itemToMove?.id);
          }
        } else if (i?.project?.title === "Unassigned") {
          i.tasks = i.tasks.filter((e) => e?.id !== itemToMove?.id);
        }
      });
    } else {
      let obj = { project: itemToMove?.project, tasks: [itemToMove] };
      oldDropList.unshift(obj);
    }

    listCopy[result.destination.droppableId] = oldDropList;

    setElements(listCopy);
  };

  return (
    <div className="max-w-max mx-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-x-4 max-w-max min-w-max">
          {lists.map((listKey) => (
            <DraggableElement
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
              selectedTab={selectedTab}
              onUpdate={onUpdate}
              fetching={fetching}
              afterDelete={afterDelete}
              showLoadMore={showLoadMore}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default DragList;
