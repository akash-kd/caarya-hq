import { useState, useEffect } from "react";

import SearchBox from "components/Comman/Inputs/SearchBox";
import EmptyState from "components/Comman/EmptyState";
import ShortURLsCard, { ShortUrlLoader } from "components/Learning/Card";
import * as ShortUrlAPI from "config/APIs/shortUrls";

function Learning() {
  const [fetching, setFetching] = useState(false);
  const [shortUrls, setShortUrls] = useState([]);
  const [search, setSearch] = useState({
    searchText: "",
    isSearch: false,
  });

  const fetchAllShortUrls = async () => {
    setFetching(true);
    try {
      const response = await ShortUrlAPI.findAll({
        exclude: JSON.stringify(["Kits", "FYI", "Locker"]),
      });
      let newLinks = response.data.data.response;
      setShortUrls(newLinks);
    } catch (err) {
      console.log(err);
    }
    setFetching(false);
  };
  useEffect(() => fetchAllShortUrls(), []);

  return (
    <>
      <div className="px-7.5 pt-2.5 lg:px-0 max-w-md">
        <SearchBox
          placeholder="Start typing to find..."
          search={search}
          setSearch={setSearch}
        />
      </div>

      <div className="max-h-70vh lg:max-h-80vh overflow-y-hidden mt-5 px-5 md:px-0 lg:bg-white lg:rounded-[40px] lg:py-5 learning-hide-scrollbar">
        <div className="space-y-5 flex flex-col w-full overflow-y-auto max-h-70vh lg:max-h-80vh pb-20 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
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
                  return <ShortURLsCard {...item} onClick={() => {}} />;
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
      </div>
    </>
  );
}

export default Learning;
