import moment from "moment";
import { DocumentDuplicateIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { showToast } from "redux/toaster";
/**
 *
 * @param {Object} item
 * @param {Function} onClick
 * @returns
 */
function DriveCard({ item, onClick }) {
  const dispatch = useDispatch();
  return (
    <div className={`cursor-pointer bg-white shadow-container rounded-20px`}>
      <div className="flex flex-row items-end justify-between p-5">
        <div className="flex flex-row items-center justify-between w-full relative">
          <DocumentDuplicateIcon
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(item?.copyLink);
              dispatch(showToast({ message: "Link copied!", type: "success" }));
            }}
            className="text-primary-red-darkest w-4 h-4 absolute top-0 right-0 cursor-pointer"
          />
          <div onClick={onClick} className="space-y-1 w-full">
            <h1 className="font-inter w-11/12 break-words font-bold text-sm text-primary-gray-600 leading-4">
              {item?.name}
            </h1>

            <p className="font-inter break-words font-normal text-2xs text-primary-gray-350 leading-3">
              {moment(item?.startDate).format("ll")} -{" "}
              {moment(item?.endDate).format("ll")}
            </p>

            <div className="font-inter flex items-center py-1.5 min-h-[20px] font-normal text-2xs text-primary-gray-350 leading-3">
              {item?.template && (
                <div className="py-1 px-2.5 rounded-full bg-primary-red-lightest text-primary-red-darkest">
                  {item?.template?.name}
                </div>
              )}
            </div>

            <div className="mt-4 font-inter text-xs font-bold text-primary-red-darkest border-primary-red-lighter break-all border-t pt-2 w-full flex flex-row items-center justify-between">
              <div>
                {`${item?.applicantsLength || 0} applicant${
                  item?.applicantsLength > 1 ? "s" : ""
                }`}
              </div>
              <div
                onClick={() => {
                  window.open(item?.openLink, "_blank").focus();
                }}
              >
                View Link ->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DriveCardLoader() {
  return (
    <div className=" cursor-pointer bg-white shadow-container rounded-20px">
      <div className="flex flex-row items-end justify-between p-5">
        <div className="flex flex-row items-center justify-between w-full relative">
          <DocumentDuplicateIcon className="text-primary-red-darkest w-4 h-4 absolute top-0 right-0 cursor-pointer" />
          <div className="space-y-1 w-full">
            <p className="inter text-sm h-4 rounded bg-gray-200 animate-pulse w-8/12 font-normal text-primary-gray-600"></p>

            <p className="font-inter break-words font-normal text-2xs text-primary-gray-350 leading-3">
              <p className="inter text-sm h-2 rounded bg-gray-200 animate-pulse w-8/12 font-normal text-primary-gray-600"></p>
            </p>

            <div className="font-inter flex items-center py-1.5 min-h-[20px] font-normal text-2xs text-primary-gray-350 leading-3"></div>

            <div className="mt-4 font-inter text-xs font-bold text-primary-red-darkest border-primary-red-lighter break-all border-t pt-2 w-full flex flex-row items-center justify-between">
              <p className="inter text-sm h-2 rounded bg-gray-200 animate-pulse w-8/12 font-normal text-primary-gray-600"></p>

              <div>View Link -></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriveCard;
export { DriveCardLoader };
