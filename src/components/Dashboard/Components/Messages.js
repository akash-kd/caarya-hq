import EmptyState from "components/Comman/EmptyState";
import moment from "moment";

const Message = ({ item }) => {
  return (
    <div className={`py-3 border-b border-gray-200 `}>
      <h1 className="font-karla text-gray-900 lg:text-[21px] flex items-center gap-3">
        <div className="h-[44px] max-h-[44px] w-[44px] min-w-[44px] rounded-full bg-gray-200"></div>
        <div className="w-full">
          <div className="text-base flex w-full items-center justify-between">
            <span className="font-semibold">{item?.title}</span>
            <span className="text-sm text-gray-400">
              {moment(item?.createdAt).format("ll")}
            </span>
          </div>
          <div className="text-sm text-gray-500">{item?.content}</div>
        </div>
      </h1>
    </div>
  );
};

export default function Messages({ list, type }) {
  return (
    <div>
      {list?.length > 0 ? (
        list?.map((item) => <Message item={item} />)
      ) : (
        <EmptyState
          image="/assets/images/empty/noGoals.png"
          text={`You have no ${type}!`}
        />
      )}
    </div>
  );
}
