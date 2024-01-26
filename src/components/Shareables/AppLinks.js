import { apps } from "helpers/constants/appLinks";

function AppLinks({ search }) {
  const token = localStorage.getItem("token");
  return (
    <div className="w-full pb-20">
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
              <h1 className="text-xs font-bold font-satoshi text-primary-neutral-500">
                {item?.name}
              </h1>
              <div className="space-y-5 flex flex-col w-full">
                {item?.list?.map((app) => {
                  return (
                    <div
                      onClick={() =>
                        window.open(app?.link + "?token=" + token, "__blank")
                      }
                      className="flex px-2 py-5 flex-row items-center space-x-4 bg-white"
                    >
                      <div className="w-20 h-20 flex flex-row items-center justify-center">
                        <img
                          src={app?.image}
                          alt={app?.name}
                          className="w-20 h-20 rounded-full object-contain"
                        />
                      </div>
                      <div className="w-4/6 flex flex-col items-start space-y-2 font-lato">
                        <h1 className="text-sm font-bold text-black">
                          {app?.name}
                        </h1>
                        <h1 className="text-2xs text-primary-neutral-800 leading-4">
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
