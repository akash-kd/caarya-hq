import { TaskStatus } from "helpers/task";
import { QuestionMarkCircleIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";

function List({ task, setShowAddModal }) {
  const history = useHistory();
  return (
    <div
      key={task?.id}
      className="border-t py-3 px-3 flex flex-row items-center justify-between relative border-gray-200 cursor-pointer"
    >
      <div className="grid grid-cols-6 w-full">
        <div className="flex flex-row items-center col-span-4">
          <div className="flex flex-row items-center space-x-2">
            <div className="w-3 mt-1.5">
              <div
                style={{
                  backgroundColor: TaskStatus.find(
                    (e) => e.value == task?.status
                  )?.color,
                }}
                className="h-2 w-2 rounded-full"
              ></div>
            </div>
            <div
              onClick={() => {
                history.push({
                  pathname: `/tasks/${task?.id}`,
                  state: {
                    task: task,
                  },
                });
              }}
              className="w-11/12"
            >
              <p className="text-md inter text-primary-gray-1000 cursor-pointer break-words">
                {task.title}
              </p>
              <p className="text-xs inter max-w-max cursor-pointer theme-gray-300">
                {task?.project?.title}
              </p>
            </div>
          </div>
        </div>
        {/* <div
          onClick={() => {
            setShowAddModal(task);
          }}
          className="flex flex-row items-center justify-end -space-x-3 col-span-2"
        >
          {task?.students?.length > 0 &&
            task?.students?.map((item) => {
              return (
                <>
                  {item?.image?.url ? (
                    <img
                      src={item?.image?.url}
                      alt="member"
                      className="w-7 h-7 sm:w-10 sm:h-10 bg-gray-300 text-gray-500 rounded-full flex-shrink-0 shadow-lg"
                    />
                  ) : (
                    <UserCircleIcon className="w-7 h-7 sm:w-10 sm:h-10 bg-gray-300 text-gray-500 rounded-full flex-shrink-0 shadow-lg" />
                  )}
                </>
              );
            })}
          {task?.students?.length == 0 && (
            <QuestionMarkCircleIcon className="w-7 h-7 sm:w-10 sm:h-10 bg-gray-300 text-gray-500 rounded-full flex-shrink-0 shadow-lg" />
          )}
        </div> */}
      </div>
    </div>
  );
}

export default List;
