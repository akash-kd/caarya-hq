// Kanban board
import DragList from "./DragList";

/**
 * StatusBoard Component
 * @returns
 */

function StatusBoard({
  selectedTab,
  onUpdate,
  afterDelete,
  data,
  showLoadMore,
  fetching,
}) {
  return (
    <div className="">
      <DragList
        selectedTab={selectedTab}
        onUpdate={onUpdate}
        afterDelete={afterDelete}
        data={data}
        fetching={fetching}
        showLoadMore={showLoadMore}
      />
    </div>
  );
}

export default StatusBoard;
