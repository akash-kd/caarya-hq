/**
 * ViewSwitch Component V2
 * @param {String} viewType - current view
 * @param {Function} setViewType - Function to set the viewType
 * @param {String} view1 - String stating first view
 * @param {String} view2 - String stating second view
 * @returns
 */

function ViewSwitch({ viewType, setViewType, view1, view2 }) {
  return (
    <>
      <div
        className={`max-w-max flex flex-col items-start rounded-md text-xs cursor-pointer`}
      >
        <h1 className="font-lato text-primary-gray-600 mb-1 font-normal text-2xs">
          View Format
        </h1>
        <div className="flex flex-row items-center w-full justify-center space-x-3">
          <div
            onClick={() => {
              setViewType(view1);
            }}
            className={`flex flex-row items-center justify-center`}
          >
            {viewType === view1 ? (
              <>
                {view1 == "Cards" ? (
                  <img
                    src="/assets/images/icons/selectedCard.svg"
                    alt=""
                    className="w-4"
                  />
                ) : view1 == "Board" ? (
                  <img
                    src="/assets/images/icons/selectedKanban.svg"
                    alt=""
                    className="w-4"
                  />
                ) : (
                  <img
                    src="/assets/images/icons/selectedTable.svg"
                    alt=""
                    className="w-4"
                  />
                )}
              </>
            ) : (
              <>
                {view1 == "Cards" ? (
                  <img
                    src="/assets/images/icons/card.svg"
                    alt=""
                    className="w-4"
                  />
                ) : view1 == "Board" ? (
                  <img
                    src="/assets/images/icons/kanban.svg"
                    alt=""
                    className="w-4"
                  />
                ) : (
                  <img
                    src="/assets/images/icons/table.svg"
                    alt=""
                    className="w-4"
                  />
                )}
              </>
            )}
          </div>
          <div
            onClick={() => {
              setViewType(view2);
            }}
            className={`flex flex-row items-center justify-center `}
          >
            {viewType === view2 ? (
              <>
                {view2 == "Cards" ? (
                  <img
                    src="/assets/images/icons/selectedCard.svg"
                    alt=""
                    className="w-4"
                  />
                ) : view2 == "Board" ? (
                  <img
                    src="/assets/images/icons/selectedKanban.svg"
                    alt=""
                    className="w-4"
                  />
                ) : (
                  <img
                    src="/assets/images/icons/selectedTable.svg"
                    alt=""
                    className="w-4"
                  />
                )}
              </>
            ) : (
              <>
                {view2 == "Cards" ? (
                  <img
                    src="/assets/images/icons/card.svg"
                    alt=""
                    className="w-4"
                  />
                ) : view2 == "Board" ? (
                  <img
                    src="/assets/images/icons/kanban.svg"
                    alt=""
                    className="w-4"
                  />
                ) : (
                  <img
                    src="/assets/images/icons/table.svg"
                    alt=""
                    className="w-4"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewSwitch;
