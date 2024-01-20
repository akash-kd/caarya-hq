import { apps } from "helpers/constants/appLinks";

function AppLinks({ search }) {
  const token = localStorage.getItem("token");
  return (
    <div className="px-5 space-y-5 w-full overflow-y-auto max-h-70vh pb-20">
      {apps.map((item) => {
        if (
          !search?.searchText ||
          (search?.searchText &&
            (item?.name
              ?.toLowerCase()
              ?.includes(search?.searchText?.toLowerCase()) ||
              JSON.stringify(item?.list)
                ?.toLowerCase()
                ?.includes(search?.searchText?.toLowerCase())))
        )
          return (
            <>
              <h1 className="text-2xs font-bold font-inter text-primary-gray-1000">
                {item?.name}
              </h1>
              <div className="space-y-5 flex flex-col w-full">
                {item?.list?.map((app) => {
                  return (
                    <div
                      onClick={() =>
                        window.open(app?.link + "?token=" + token, "__blank")
                      }
                      className="flex flex-row items-center space-x-4 bg-white rounded-lg shadow-sm p-3.5"
                    >
                      <div className="w-20 h-20 flex flex-row items-center justify-center">
                        <img
                          src={app?.image}
                          alt={app?.name}
                          className="w-20 h-20 rounded-full object-contain"
                        />
                      </div>
                      <div className="w-4/6 flex flex-col items-start space-y-1 font-inter">
                        <h1 className="text-sm font-inter font-bold text-primary-gray-1000">
                          {app?.name}
                        </h1>
                        <h1 className="text-2xs font-inter text-primary-gray-1000">
                          {app?.description}
                        </h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
      })}
    </div>
  );
}

export default AppLinks;
