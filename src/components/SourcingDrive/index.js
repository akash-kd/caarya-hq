import { useState, useEffect } from "react";

import EmptyState from "components/Comman/EmptyState";

import { useDispatch, useSelector } from "react-redux";
import * as DriveAPI from "config/APIs/sourcingDrive";
import { updateList } from "redux/sourcingDrive";
import DriveCard, { DriveCardLoader } from "./Card";
import { useHistory } from "react-router-dom";
import { feBaseLink } from "config";

function SourcingDriveList({ search }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sourcingDrive = useSelector((state) => state.sourcingDrive);
  const [fetching, setFetching] = useState(false);
  const [list, setList] = useState([]);
  const [showing, setShowing] = useState("");

  const fetchAll = async () => {
    if (sourcingDrive?.list?.length > 0 || sourcingDrive?.fetching == false) {
      setList(sourcingDrive?.list);
      let str = `${sourcingDrive?.list?.length} active sourcing drive`;
      setShowing(str);
      return;
    }

    setFetching(true);
    try {
      const response = await DriveAPI.getAllEntity({
        drive: true,
        showStats: true,
      });
      let data = response.data.data;
      data = data?.map((i) => ({
        ...i,
        copyLink: `${feBaseLink?.applicationForm}/sourcingDrive/${i?.id}`,
        openLink: `${feBaseLink?.applicationForm}/sourcingDrive/${i?.id}`,
      }));
      setList(data);
      let str = `${data?.length} active sourcing drive`;
      setShowing(str);
      dispatch(updateList({ list: data }));
    } catch (err) {
      console.log(err);
    }
    setFetching(false);
  };

  useEffect(() => fetchAll(), [sourcingDrive?.list]);

  return (
    <>
      <div className="z-20 w-full py-2 pl-8 pr-8 flex flex-row items-center justify-between">
        <h1 className="text-xs font-inter font-normal w-full text-primary-gray-900 flex flex-row items-center">
          Showing <p className="font-bold ml-1">{showing}</p>
        </h1>
      </div>
      <div className="px-5 space-y-5 flex flex-col w-full overflow-y-auto max-h-70vh pb-20">
        {!fetching ? (
          <>
            {list?.length > 0 ? (
              list.map((item) => {
                if (
                  !search?.searchText ||
                  (search?.searchText &&
                    item?.name
                      ?.toLowerCase()
                      ?.includes(search?.searchText?.toLowerCase()))
                )
                  return (
                    <DriveCard
                      item={item}
                      onClick={() => {
                        // history.push(`/drives/${item?.id}`);
                      }}
                    />
                  );
              })
            ) : (
              <EmptyState />
            )}
          </>
        ) : (
          <>
            {[1, 2, 3, 4, 5, 6].map((item) => {
              return <DriveCardLoader {...item} />;
            })}
          </>
        )}
      </div>
    </>
  );
}

export default SourcingDriveList;
