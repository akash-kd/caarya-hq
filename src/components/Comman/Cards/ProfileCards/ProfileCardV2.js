import { AcademicCapIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { MdMilitaryTech } from "react-icons/md";

/**
 * Displays the ProfileCards Component
 * @param {Object} person
 * @param {Function} onClick
 * @param {String} type
 * @returns
 */

export default function ProfileCards({ person, onClick }) {
  const {
    first_name,
    last_name,
    name,
    college,
    image,
    id,
    _id,
    designation,
    caarya_id,
  } = person;

  return (
    <>
      <div className="members-card max-w-md w-full mx-auto relative">
        <div
          className={`bg-circle ${
            person?.user_type == "customer-fic"
              ? "purple"
              : person?.user_type == "cgc-leader"
              ? "aqua"
              : designation?.rank?.rank_name
                  ?.toLowerCase()
                  ?.includes("professional")
              ? "yellow"
              : designation?.rank?.rank_name?.toLowerCase()?.includes("jsquad")
              ? "green"
              : "red"
          } absolute top-0 left-0 h-full w-1/2`}
        />
        <div className="w-full p-4 flex flex-row items-stretch space-x-3 relative">
          <div className="w-16 h-16 bg-white rounded-full p-1.5">
            <img
              className="w-full h-full bg-primary-gray-300 rounded-full flex-shrink-0 object-cover "
              src={image?.url}
              alt=""
            />
          </div>

          <div className="w-3/4 flex flex-row items-center space-x-2">
            <div className="w-11/12">
              <h3 className="font-bold text-primary-gray-600 truncate font-lato leading-4">
                {first_name || name} {last_name ? ` ${last_name}` : ""}
              </h3>

              <div className="flex flex-row items-center mt-0.5 ">
                <AcademicCapIcon className="w-3 h-3 mr-1" />
                <p className="text-primary-gray-600 text-2xs line-clamp-2 font-lato font-normal">
                  {`${college?.college_name || college}`}
                </p>
              </div>
              <div className="-mt-1 flex flex-row items-center w-full">
                <MdMilitaryTech className="w-3 h-3 mt-0.5 mr-1" />
                <p className="w-10/12 text-primary-gray-600 h-5 break-all text-2xs font-lato font-normal  leading-6">
                  {`${designation?.rank?.rank_name || ""}`}
                </p>
              </div>
            </div>
            {/* <div
              onClick={onClick}
              className="flex flex-row items-center h-full"
            >
              <ArrowRightIcon className="w-4 h-4 text-primary-gray-600 hover:scale-105 transition ease-in-out duration-150 cursor-pointer" />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
