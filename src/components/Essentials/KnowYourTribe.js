import ProfileCards from "components/Comman/Cards/ProfileCards/ProfileCardV2";
import { useSelector } from "react-redux";

function KnowYourTribe() {
  const users = useSelector((state) => state?.dropdown?.users?.list);
  return (
    <>
      <div className="bg-primary-gray-50 px-4 w-full pt-4 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-85vh lg:h-auto overflow-y-auto">
        {users?.map((item) => {
          if (item?.user_type == "caarya-core")
            return <ProfileCards person={item} />;
        })}
      </div>
    </>
  );
}

export default KnowYourTribe;
