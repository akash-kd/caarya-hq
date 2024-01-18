import ChronosButton from "components/Comman/Buttons";
import { TaskStatus } from "helpers/task";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllgoals, updateInFocus } from "redux/goal";
import { ReactComponent as GoalIcon } from "assets/icons/Goal.svg";
import { useState } from "react";
import GoalsCreate from "components/Modals/Goal/GoalCreate";

const Row = ({ item, onClick, checked }) => {
  return (
    <tr className="text-xl font-karla">
      <td className="py-5">
        <input
          onChange={onClick}
          checked={checked}
          type="checkbox"
          className="mb-1 mr-2 border rounded text-primary-yellow-dark focus:ring-0"
        />
        {item?.title}
      </td>
      <td className="p-5">{moment(item?.dueDate).format("ll")}</td>
      <td className="p-5">{item?.priority}</td>
      <td className="p-5">{item?.project?.title}</td>
      <td className="p-5">
        {TaskStatus?.find((t) => t?.value == item?.status)?.label}
      </td>
    </tr>
  );
};

export function PickYourTaskForSmallScreen() {
  const dispatch = useDispatch();
  const allGoals = useSelector((state) => state.goals);
  const inFocusGoal = useSelector((state) => state.goals.inFocus?.goals);

  return allGoals?.owner?.goals?.map((g) => {
    return (
      <div className="px-2 py-1 my-2 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          <input
            checked={inFocusGoal?.find((goal) => goal?.id == g?.id)}
            type="checkbox"
            onChange={() => {
              dispatch(updateInFocus({ goal: g }));
            }}
            className="border rounded text-primary-yellow-dark focus:ring-0"
          />
          <span className="text-xs ml-1.5">{g?.title}</span>
        </div>
        <div className="grid grid-cols-4 mt-2">
          <div>
            <span className="block text-gray-600 text-2xs">Due Date</span>
            <span className="text-2xs text-primary-yellow-darkest">
              {moment(g?.dueDate).format("ll")}
            </span>
          </div>
          <div>
            <span className="block text-gray-600 text-2xs">Priority</span>
            <span className="text-2xs text-primary-yellow-darkest">
              {g?.priority}
            </span>
          </div>
          <div>
            <span className="block text-gray-600 text-2xs">Project Name</span>
            <span className="text-2xs text-primary-yellow-darkest">
              {g?.project?.title}
            </span>
          </div>
          <div>
            <span className="block text-gray-600 text-2xs">Current Status</span>
            <span className="text-2xs text-primary-yellow-darkest">
              {TaskStatus?.find((t) => t?.value == g?.status)?.label}
            </span>
          </div>
        </div>
      </div>
    );
  });
}

export default function PickYourTask() {
  const dispatch = useDispatch();
  const allGoals = useSelector((state) => state.goals);
  const inFocusGoal = useSelector((state) => state.goals.inFocus?.goals);
  const [mobileCreateModal, setMobileCreateModal] = useState(false);

  return (
    <div className="max-w-full">
      <GoalsCreate
        // projectType={project?.type}
        // project={project}
        isOpen={mobileCreateModal}
        closeModal={() => setMobileCreateModal(false)}
        onCreate={(val) => {
          dispatch(fetchAllgoals());
        }}
      />
      {allGoals?.owner?.goals?.length > 0 ? (
        <table className="w-full overflow-x-auto">
          <tbody>
            {allGoals?.owner?.goals?.map((e, i) => (
              <Row
                key={i}
                item={e}
                checked={inFocusGoal?.find((goal) => goal?.id == e?.id)}
                onClick={() => {
                  dispatch(updateInFocus({ goal: e }));
                }}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mt-8 mb-24 mx-auto text-center">
          <img
            src="/assets/images/empty/noGoals.png"
            className="w-[180px] h-[200px] mx-auto"
          />
          <p className="text-base font-karla text-primary-yellow-dark mt-4">
            You do not have any goals currently. <br /> Start now by adding a
            goal!
          </p>
          <div className="mx-auto flex justify-center mt-4">
            <ChronosButton
              primary
              text="Add New Goal"
              icon={<GoalIcon className="fill-white h-6 ml-1" />}
              onClick={() => {
                setMobileCreateModal(true);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
