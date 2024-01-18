import { Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";
import TaskCard from "../Card";

/**
 * Displays the individual task under a particular project
 * @returns
 */

const ListItem = ({
  project,
  item,
  index,
  onUpdate,
  key,
  afterDelete,
  fetching,
  selectedTab,
}) => {
  useEffect(() => {}, [item]);

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className="kanban-board mb-5"
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TaskCard
              showAssignedBy={selectedTab === "owner"}
              showAssignedTo={selectedTab === "creator"}
              index={index}
              project={project}
              task={item}
              onUpdate={(id, val, field) => {
                onUpdate(id, val, field);
              }}
              afterDelete={(val) => afterDelete(val)}
            />
          </div>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
