import EmptyState from "components/Comman/EmptyState";
import { useState, useEffect } from "react";
import * as MarketingAPI from "config/APIs/marketing";
import BreadCrumb from "components/Comman/BreadCrumb";

function TopicClusters() {
  const [list, setList] = useState([]);
  const [fetching, setFetching] = useState(true);
  const fetchAll = async () => {
    setFetching(true);
    try {
      const response = await MarketingAPI.getAllEntity("topicCluster");
      if (response.data.data && response.data.data.length > 0) {
        setList(response.data.data);
      } else {
        setList([]);
      }
    } catch (err) {
      console.log(err);
    }
    setFetching(false);
  };
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchAll();
    }

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <>
      <BreadCrumb
        back
        page1="Essentials"
        page2="Foundation Essentials"
        page3="Topic Clusters"
      />
      <div className="h-[80vh] bg-primary-gray-50 p-4 overflow-y-auto sm:grid grid-cols-2 md:grid-cols-3 sm:gap-5 space-y-5 sm:space-y-0">
        {!fetching ? (
          list.length > 0 ? (
            list.map((item, index) => {
              return (
                <div className="bg-white rounded-lg p-2.5 space-y-2">
                  <div className="flex flex-row items-end justify-between">
                    <div className="flex flex-row items-center justify-between w-full">
                      <div className="space-y-1 w-10/12 pr-4">
                        <h1 className="font-lato break-words font-bold text-sm text-primary-gray-600 leading-4">
                          {item?.name || item?.type}
                        </h1>
                        {item?.platform && (
                          <p className="font-lato font-normal text-2xs text-primary-gray-600 leading-3">
                            {item?.platform}
                          </p>
                        )}
                        {item?.description && (
                          <p className="font-lato break-words font-normal text-2xs text-primary-gray-350 leading-3">
                            {item?.description}
                          </p>
                        )}
                      </div>
                      <img
                        className={`h-14 w-14 object-cover ${
                          item?.image?.url && "rounded"
                        }`}
                        src={
                          (item?.image && item.image.url) ||
                          "/assets/images/emptystates/projectcover.svg"
                        }
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState
              image={`/assets/images/emptystates/goal.png`}
              text={`No Topic Clusters found!`}
            />
          )
        ) : (
          [1, 2, 3, 4, 5, 6]?.map((i) => {
            return (
              <div className="bg-white rounded-lg p-2.5 space-y-2">
                <div className="flex flex-row items-end justify-between">
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="space-y-1 w-10/12 pr-4">
                      <p className="font-lato text-sm h-4 rounded bg-gray-200 animate-pulse w-8/12 font-normal text-primary-gray-600"></p>
                    </div>
                    <img
                      className={`h-14 w-14 object-cover rounded`}
                      src={"/assets/images/emptystates/projectcover.svg"}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default TopicClusters;
