import { useState, useEffect } from "react";

import EmptyState from "components/Comman/EmptyState";
import ShortURLsCard, { ShortUrlLoader } from "components/Shareables/Card";
import * as ShortUrlAPI from "config/APIs/shortUrls";
import { useDispatch, useSelector } from "react-redux";
import { updateLearning } from "redux/shareables";

function LearningList({ search, type }) {
  const dispatch = useDispatch();
  const learnings = useSelector((state) => state.shareables?.learnings);
  const [fetching, setFetching] = useState(true);
  const [shortUrls, setShortUrls] = useState([]);
  const fetchAllShortUrls = async () => {
    setFetching(true);
    if (learnings[type]?.length > 0) {
      setShortUrls(learnings[type]);
      setFetching(false);
      return;
    }

    try {
      let query = {};
      if (type == "knowledge") {
        query = { ...query, exclude: JSON.stringify(["FYI", "Kits"]) };
      } else {
        query = { ...query, typeName: type };
      }
      const response = await ShortUrlAPI.findAll(query);
      let data = response.data.data.response;
      setShortUrls(data);
      dispatch(updateLearning({ type, list: data }));
    } catch (err) {
      console.log(err);
    }
    setFetching(false);
  };

  useEffect(() => fetchAllShortUrls(), [type]);
  return (
    <div className="space-y-6 flex flex-col w-full pb-20">
      {!fetching ? (
        shortUrls?.length > 0 ? (
          shortUrls.map((item) => {
            if (
              !search?.searchText ||
              (search?.searchText &&
                item?.title
                  ?.toLowerCase()
                  ?.includes(search?.searchText?.toLowerCase()))
            )
              return (
                <ShortURLsCard
                  {...item}
                  onClick={() => {
                    if (type == "knowledge") {
                    } else {
                      window.open(item?.long_url, "__blank");
                    }
                  }}
                />
              );
          })
        ) : (
          <EmptyState />
        )
      ) : (
        <>
          {[1, 2, 3, 4, 5, 6].map((item) => {
            return <ShortUrlLoader {...item} />;
          })}
        </>
      )}
    </div>
  );
}

export default LearningList;
